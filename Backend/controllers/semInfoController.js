const mongoose = require("mongoose");
const SemesterInfo = require("../models/SemesterInfo");
const Student = require("../models/Student");
const { semInfoCreateSchema , semInfoUpdateSchema } = require("../validators/seminfoValidation");
const exportToExcel = require('../helpers/excel/exportToExcel');
const { transformSemesterInfo, semesterInfoColumnMap } = require('../helpers/excel/exportTransformers');


// // Helper to calculate defaulter
// const calculateDefaulter = (attendance, kts) => {
//   return attendance < 75 || (kts && kts.length > 0);
// };

const calculateDefaulter = (attendance) => {
  return attendance < 75;
};


//create sem info student or admin/DI
const addSemInfo = async (req, res) => {
  try {
    let stuID;

    // Role handling
    if (req.user.role === "student") {
      stuID = req.user.id;
    } else if (["admin", "divisionIncharge"].includes(req.user.role)) {
      const rawStudentId = req.body.studentId;

      if (!rawStudentId) {
        return res.status(400).json({ success: false, message: "studentId is required" });
      }

      // Support both MongoDB ObjectId and custom studentID field
      let student;
      if (mongoose.Types.ObjectId.isValid(rawStudentId)) {
        student = await Student.findById(rawStudentId);
      }
      if (!student) {
        student = await Student.findOne({ studentID: rawStudentId });
      }

      if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }

      stuID = student._id;

      // DI restriction
      if (
        req.user.role === "divisionIncharge" &&
        (student.year !== req.user.year ||
         student.division !== req.user.division)
      ) {
        return res.status(403).json({
          success: false,
          message: "Division access denied",
        });
      }
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized role" });
    }

    // validation
    const { error } = semInfoCreateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { semester, attendance, kts, marks } = req.body;

    const semInfo = new SemesterInfo({
      stuID,
      semester,
      attendance,
      kts,
      marks,
      isDefaulter: calculateDefaulter(attendance),
    });

    await semInfo.save();

    res.status(201).json({
      success: true,
      message: "Semester info added successfully",
      data: semInfo,
    });

  } catch (err) {
    console.error("addSemInfo error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//update sem info
const updateSemInfo = async (req, res) => {
  try {
    const semInfo = await SemesterInfo
      .findById(req.params.id)
      .populate("stuID", "year division");

    if (!semInfo) {
      return res.status(404).json({
        success: false,
        message: "Semester info not found",
      });
    }

    // STUDENT OWNERSHIP
    if (
      req.user.role === "student" &&
      semInfo.stuID._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // DI CHECK
    if (
      req.user.role === "divisionIncharge" &&
      (semInfo.stuID.year !== req.user.year ||
       semInfo.stuID.division !== req.user.division)
    ) {
      return res.status(403).json({
        success: false,
        message: "Division access denied",
      });
    }

    // STUDENT FIELD LIMIT
    if (req.user.role === "student") {
      const allowed = ["attendance", "kts", "journalTaken", "examFormFilled"];
      Object.keys(req.body).forEach(key => {
        if (!allowed.includes(key)) delete req.body[key];
      });
    }

    // VALIDATION
    const { error } = semInfoUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    console.log(req.body);
console.log(typeof req.body.journalTaken);

    // UPDATE DATA
    Object.assign(semInfo, req.body);

    // RECALCULATE DEFAULTER
    if (req.body.attendance !== undefined || req.body.kts !== undefined) {
      semInfo.isDefaulter = calculateDefaulter(
        semInfo.attendance,
        semInfo.kts
      );
    }

    await semInfo.save();

    res.status(200).json({
      success: true,
      message: "Semester info updated successfully",
      data: semInfo,
    });

  } catch (err) {
    console.error("updateSemInfo error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//delete sem info
const deleteSemInfo = async (req, res) => {
  try {
    const semInfo = await SemesterInfo
      .findById(req.params.id)
      .populate("stuID", "year division");

    if (!semInfo) {
      return res.status(404).json({
        success: false,
        message: "Semester info not found",
      });
    }

    if (
      req.user.role === "student" &&
      semInfo.stuID._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (
      req.user.role === "divisionIncharge" &&
      (semInfo.stuID.year !== req.user.year ||
       semInfo.stuID.division !== req.user.division)
    ) {
      return res.status(403).json({
        success: false,
        message: "Division access denied",
      });
    }

    await semInfo.deleteOne();

    res.status(200).json({
      success: true,
      message: "Semester info deleted successfully",
    });

  } catch (err) {
    console.error("deleteSemInfo error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//get all sem infos with export option
const getAllSemInfos = async (req, res) => {
  try {

    const {
      semester,
      isDefaulter,
      journalTaken,
      examFormFilled,
      minAttendance,
      maxAttendance,
      year,
      division,
      search,
      page,
      limit,
      export: exportFlag
    } = req.query;

    const isExport = exportFlag === "true";

    const pageNum = Number(page) || 1;
    const limitNum = Math.min(Number(limit) || 10, 20);
    const skip = (pageNum - 1) * limitNum;

    const pipeline = [];

    // JOIN STUDENT
    pipeline.push({
      $lookup: {
        from: "students",
        localField: "stuID",
        foreignField: "_id",
        as: "student"
      }
    });

    pipeline.push({
      $unwind: {
        path: "$student",
        preserveNullAndEmptyArrays: true
      }
    });

    const match = {};

    // ROLE FILTERING
    if (req.user.role === "divisionIncharge") {
      match["student.year"] = req.user.year;
      match["student.division"] = req.user.division;
    }

    if (req.user.role === "admin") {
      if (year) match["student.year"] = year.trim();
      if (division) match["student.division"] = division.trim();
    }

    // SEMESTER
    if (semester) match.semester = Number(semester);

    // BOOLEAN FILTERS
    if (isDefaulter === "true") match.isDefaulter = true;
    if (isDefaulter === "false") match.isDefaulter = false;

    if (journalTaken === "true") match.journalTaken = true;
    if (journalTaken === "false") match.journalTaken = false;

    if (examFormFilled === "true") match.examFormFilled = true;
    if (examFormFilled === "false") match.examFormFilled = false;

    // ATTENDANCE RANGE
    if (minAttendance || maxAttendance) {
      match.attendance = {};

      if (minAttendance) match.attendance.$gte = Number(minAttendance);
      if (maxAttendance) match.attendance.$lte = Number(maxAttendance);
    }

    // SEARCH
    if (search) {
      const safeSearch = search.replace(/[-[\]{}()*+?.,\\^$|#]/g, "");

      match.$or = [
        { "student.name.firstName": { $regex: safeSearch, $options: "i" } },
        { "student.name.middleName": { $regex: safeSearch, $options: "i" } },
        { "student.name.lastName": { $regex: safeSearch, $options: "i" } },
        { "student.studentID": { $regex: safeSearch, $options: "i" } }
      ];
    }

    if (Object.keys(match).length) {
      pipeline.push({ $match: match });
    }

    // EXPORT FIELDS
    const exportFields = {
  semester: 1,
  attendance: 1,
  kts: 1,
  marks: 1,
  isDefaulter: 1,
  journalTaken: 1,
  examFormFilled: 1,

  // Student identity
  stuID: "$student._id",
  studentID: "$student.studentID",
  PRN: "$student.PRN",

  // Student name
  studentName: "$student.name",

  // Student academic
  studentYear: "$student.year",
  studentDivision: "$student.division",
  studentBranch: "$student.branch",

  // Student personal
  studentDob: "$student.dob",
  studentBloodGroup: "$student.bloodGroup",
  studentCategory: "$student.category",
  studentAbcId: "$student.abcId",

  // Student contact
  studentMobileNo: "$student.mobileNo",
  studentParentMobileNo: "$student.parentMobileNo",
  studentEmail: "$student.email",
  studentParentEmail: "$student.parentEmail",

  // Addresses
  studentCurrentAddress: "$student.currentAddress",
  studentNativeAddress: "$student.nativeAddress"
};

    const leanFields = {
      semester: 1,
      attendance: 1,
      kts: 1,
      isDefaulter: 1,
      journalTaken: 1,
      examFormFilled: 1,

      stuID: "$student._id",
      studentID: "$student.studentID",
      studentName: "$student.name",
      studentYear: "$student.year",
      studentDivision: "$student.division"
    };

    // EXPORT
    if (isExport) {
      const semInfos = await SemesterInfo.aggregate([
        ...pipeline,
        { $sort: { createdAt: -1 } },
        { $project: exportFields }
      ]);

      const rows = semInfos.map(transformSemesterInfo);

      const buffer = await exportToExcel(
        rows,
        "Semester Info",
        semesterInfoColumnMap
      );

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="semester-info.xlsx"'
      );

      return res.send(buffer);
    }

    // PAGINATION
    const results = await SemesterInfo.aggregate([
      ...pipeline,
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limitNum },
            { $project: leanFields }
          ],
          totalCount: [{ $count: "total" }]
        }
      }
    ]);

    const semInfos = results[0]?.data || [];
    const total = results[0]?.totalCount[0]?.total || 0;

    return res.json({
      success: true,
      data: semInfos,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });

  } catch (err) {
    console.error(
      "Error in getAllSemInfos controller:",
      "\ntime = ",
      new Date().toISOString(),
      "\nError:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message || "Some Error Occurred. Please Try Again Later."
    });
  }
};


const getOwnSemInfos = async (req, res) => {
  try {
    const data = await SemesterInfo.find({ stuID: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data });

  } catch (err) {
    console.error("getOwnSemInfos error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


//get student sem infos by admin or di
const getStudentSemInfos = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Support both MongoDB ObjectId and custom studentID field
    let student;
    if (mongoose.Types.ObjectId.isValid(studentId)) {
      student = await Student.findById(studentId);
    }
    if (!student) {
      student = await Student.findOne({ studentID: studentId });
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (
      req.user.role === "divisionIncharge" &&
      (student.year !== req.user.year ||
       student.division !== req.user.division)
    ) {
      return res.status(403).json({
        success: false,
        message: "Division access denied",
      });
    }

    const data = await SemesterInfo.find({ stuID: student._id })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data });

  } catch (err) {
    console.error("getStudentSemInfos error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


//exporting all controller functions
module.exports = {
  addSemInfo,
  updateSemInfo,
  deleteSemInfo,
  getAllSemInfos,
  getOwnSemInfos,
  getStudentSemInfos,
};