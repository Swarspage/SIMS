const mongoose = require("mongoose");
const SemesterInfo = require("../models/SemesterInfo");
const Student = require("../models/Student");
const { semInfoCreateSchema , semInfoUpdateSchema } = require("../validators/seminfoValidation");

// Helper to calculate defaulter
const calculateDefaulter = (attendance, kts) => {
  return attendance < 75 || (kts && kts.length > 0);
};

//create sem info student or admin/DI
const addSemInfo = async (req, res) => {
  try {
    let stuID;

    // Role handling
    if (req.user.role === "student") {
      stuID = req.user.id;
    } else if (["admin", "divisionIncharge"].includes(req.user.role)) {
      stuID = req.body.studentId;

      if (!stuID || !mongoose.Types.ObjectId.isValid(stuID)) {
        return res.status(400).json({ success: false, message: "Invalid student ID" });
      }

      const student = await Student.findById(stuID);
      if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }

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
      isDefaulter: calculateDefaulter(attendance, kts),
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
      const allowed = ["attendance", "kts"];
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

// get all sem infos by admin or di
const getAllSemInfos = async (req, res) => {
  try {
    const query = {};

    if (req.user.role === "divisionIncharge") {
      const students = await Student.find({
        year: req.user.year,
        division: req.user.division,
      }).select("_id");

      query.stuID = { $in: students.map(s => s._id) };
    }

    const data = await SemesterInfo.find(query)
      .populate("stuID", "name roll year division")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data });

  } catch (err) {
    console.error("getAllSemInfos error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


//get own sem infos by student
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

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const student = await Student.findById(studentId);
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

    const data = await SemesterInfo.find({ stuID: studentId })
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
