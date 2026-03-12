const mongoose = require("mongoose");
const Achievement = require("../models/Achievement");
const Student = require("../models/Student");
const Admin = require("../models/Admin");
const { uploadToCloudinary } = require("../helpers/cloudinary/UploadToCloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const { deleteMultipleFromCloudinary } = require("../helpers/cloudinary/DeleteMultipleFromCloudinary");
const { validateAndUploadFiles } = require("../helpers/cloudinary/ValidateAndUploadFiles");
const { createAchievementSchema, updateAchievementSchema , getAchievementsValidation} = require("../validators/achievementValidation");
const exportToExcel = require('../helpers/excel/exportToExcel');
const { transformAchievement, achievementColumnMap } = require('../helpers/excel/exportTransformers');

/* VALIDATION ERROR RESPONSE HELPER */
const validationErrorResponse = (res, details) =>
  res.status(400).json({
    success: false,
    message: "Validation failed",
    errors: details.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    })),
  });

/* FILE CONFIG */

const fileConfigs = [
  {
    fieldName: "eventPhoto",
    allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
    maxSize: 500 * 1024, // 500KB
    friendlyName: "Event Photo",
  },
  {
    fieldName: "certificate",
    allowedTypes: ["image/jpeg", "image/png", "image/jpg", "application/pdf"],
    maxSize: 500 * 1024, // 500KB
    friendlyName: "Certificate",
  },
  {
    fieldName: "course_certificate",
    allowedTypes: ["image/jpeg", "image/png", "image/jpg", "application/pdf"],
    maxSize: 500 * 1024, // 500KB
    friendlyName: "Course Certificate",
  },
];

// create achievement
const createAchievement = async (req, res) => {
  let uploadedFiles;
  let dbSaved = false;

  try {
    // Construct date object from simple keys
    if (req.body.dateFrom && req.body.dateTo) {
      req.body.date = {
        from: req.body.dateFrom,
        to: req.body.dateTo
      };
    }

    // Normalize teamMembers to array if it is a single string
    if (req.body.teamMembers && typeof req.body.teamMembers === 'string') {
      req.body.teamMembers = [req.body.teamMembers];
    }

    /* Joi Validation */
    const { error, value } = createAchievementSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map(e => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }

    let stuID;

    if (req.user.role === "student") {
      stuID = req.user.id;
    } else if (req.user.role === "admin" || req.user.role === "divisionIncharge") {
      // stuID = req.body.studentId;
      const rawStudentID = req.body.studentId;

      if (!rawStudentID) {
        return res.status(400).json({ success: false, message: "Student ID is required" });
      }

      // Support both MongoDB ObjectId and studentID 
      let student;
      if (mongoose.Types.ObjectId.isValid(rawStudentID)) {
        student = await Student.findById(rawStudentID);
      }

      //search by studentID field if not found via ObjectId
      if (!student) {
        student = await Student.findOne({ studentID: rawStudentID });
      }

      if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }

      stuID = student._id;
    

      if (
        req.user.role === "divisionIncharge" &&
        (student.year !== req.user.year || student.division !== req.user.division)
      ) {
        return res.status(403).json({
          success: false,
          message: "You can access students only from your division",
        });
      }
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized role" });
    }

    if (!req.files?.eventPhoto || !req.files?.certificate) {
      return res.status(400).json({
        success: false,
        message: "Event photo and certificate are required",
      });
    }

    const activeFileConfigs = fileConfigs.filter(
      (config) => req.files?.[config.fieldName]
    );

    uploadedFiles = await validateAndUploadFiles(req.files, activeFileConfigs);

    const achievement = new Achievement({
      stuID,
      ...value, // validated data only
      photographs: {
        eventPhoto: uploadedFiles.eventPhoto,
        certificate: uploadedFiles.certificate,
      },
      course_certificate: uploadedFiles.course_certificate || {},
    });

    await achievement.save();
    dbSaved = true;

    return res.status(201).json({
      success: true,
      message: "Achievement created successfully",
      data: achievement,
    });
  } catch (err) {
    console.error("Create Achievement Error:", err);

    if (!dbSaved && uploadedFiles) {
      const ids = Object.values(uploadedFiles)
        .map(f => f?.publicId)
        .filter(Boolean);
      await deleteMultipleFromCloudinary(ids);
    }

    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//get logged in student data
const getOwnAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ stuID: req.user.id })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: achievements });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


//getall achievements with export option
const getAllAchievements = async (req, res) => {
  try {
    const { error, value } = getAchievementsValidation.validate(req.query);
    if (error) return validationErrorResponse(res, error.details);

    const isExport = value.export === "true";
    const page = Math.max(1, Number(value.page || 1));
    const limit = Math.min(Number(value.limit || 10), 50); // single capped value
    const skip = (page - 1) * limit;

    const { year, division, category, achievementType, search } = value;


    const pipeline = [
      {
        $lookup: {
          from: "students",
          localField: "stuID",
          foreignField: "_id",
          as: "student",
        },
      },
      { $unwind: "$student" },
    ];

    const match = {};

    if (req.user.role === "divisionIncharge") {
      match["student.year"] = req.user.year;
      match["student.division"] = req.user.division;
    } else if (req.user.role === "admin") {
      if (year) match["student.year"] = year;
      if (division) match["student.division"] = division;
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized role" });
    }

    if (category) match.category = category;
    if (achievementType) match.achievementType = achievementType;

    if (search) {
      const safeSearch = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

      match.$or = [
        { title: { $regex: safeSearch, $options: "i" } },
        { issuedBy: { $regex: safeSearch, $options: "i" } },
        { "student.name.firstName": { $regex: safeSearch, $options: "i" } },
        { "student.name.lastName": { $regex: safeSearch, $options: "i" } },
      ];
    }

    pipeline.push({ $match: match });

    //export branch 
    if (isExport) {
      const achievements = await Achievement.aggregate([
        ...pipeline,
        { $sort: { createdAt: -1 } }, 
        { $limit: 5000 }, 
        {
          $project: {
            category: 1,
            title: 1,
            description: 1,
            issuedBy: 1,
            achievementType: 1,
            date: 1,
            teamMembers: 1,
            certification_course: 1,
            photographs: 1,
            course_certificate: 1,

            stuID: "$student._id",
            studentID: "$student.studentID",
            PRN: "$student.PRN",
            studentName: "$student.name",
            studentYear: "$student.year",
            studentDivision: "$student.division",
            studentBranch: "$student.branch",
            studentEmail: "$student.email",
            studentMobileNo: "$student.mobileNo",
          },
        },
      ]);

      const rows = achievements.map(transformAchievement);

      const buffer = await exportToExcel(
        rows,
        "Achievements",
        achievementColumnMap
      );

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="achievements.xlsx"'
      );

      return res.send(buffer);
    }

    //pagination branch
    const result = await Achievement.aggregate([
      ...pipeline,
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: (limit) },
          ],
          total: [{ $count: "count" }],
        },
      },
    ]);

    const total = result[0].total[0]?.count || 0;

    return res.status(200).json({
      success: true,
      data: result[0].data,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("GetAllAchievements Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


//get achievement by student (admin | DI )
const getStudentAchievements = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    if (
      req.user.role === "divisionIncharge" &&
      (student.year !== req.user.year || student.division !== req.user.division)
    ) {
      return res.status(403).json({ success: false, message: "Division access denied" });
    }

    const achievements = await Achievement.find({ stuID: studentId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: achievements });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//update achievement
const updateAchievement = async (req, res) => {
  let newPublicIds = [];
  let dbSaved = false;

  try {
    // Construct date object from simple keys
    if (req.body.dateFrom && req.body.dateTo) {
      req.body.date = {
        from: req.body.dateFrom,
        to: req.body.dateTo
      };
    }

    // Normalize teamMembers to array if it is a single string
    if (req.body.teamMembers && typeof req.body.teamMembers === 'string') {
      req.body.teamMembers = [req.body.teamMembers];
    }

    /* Joi Validation */
    const { error, value } = updateAchievementSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map(e => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    let query = Achievement.findById(id);
    if (req.user.role !== "student") {
      query = query.populate("stuID", "year division");
    }

    const achievement = await query;
    if (!achievement) {
      return res.status(404).json({ success: false, message: "Achievement not found" });
    }

    if (req.user.role === "student" && achievement.stuID.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (
      req.user.role === "divisionIncharge" &&
      (achievement.stuID.year !== req.user.year ||
        achievement.stuID.division !== req.user.division)
    ) {
      return res.status(403).json({ success: false, message: "Division access denied" });
    }

    const uploaded = {};
    if (req.files) {
      const activeFileConfigs = fileConfigs.filter(
        (config) => req.files[config.fieldName]
      );
      if (activeFileConfigs.length > 0) {
        Object.assign(uploaded, await validateAndUploadFiles(req.files, activeFileConfigs));
      }
    }

    const oldIds = [];

    if (uploaded.eventPhoto) {
      oldIds.push(achievement.photographs.eventPhoto.publicId);
      achievement.photographs.eventPhoto = uploaded.eventPhoto;
      newPublicIds.push(uploaded.eventPhoto.publicId);
    }

    if (uploaded.certificate) {
      oldIds.push(achievement.photographs.certificate.publicId);
      achievement.photographs.certificate = uploaded.certificate;
      newPublicIds.push(uploaded.certificate.publicId);
    }

    if (uploaded.course_certificate) {
      if (achievement.course_certificate?.publicId) {
        oldIds.push(achievement.course_certificate.publicId);
      }
      achievement.course_certificate = uploaded.course_certificate;
      newPublicIds.push(uploaded.course_certificate.publicId);
    }

    Object.assign(achievement, value); //validated update data
    await achievement.save();
    dbSaved = true;

    if (oldIds.length) {
      await deleteMultipleFromCloudinary(oldIds);
    }

    return res.status(200).json({
      success: true,
      message: "Achievement updated successfully",
      data: achievement,
    });
  } catch (err) {
    if (!dbSaved && newPublicIds.length) {
      await deleteMultipleFromCloudinary(newPublicIds);
    }
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//delete achievement
const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    let query = Achievement.findById(id);
    if (req.user.role !== "student") {
      query = query.populate("stuID", "year division");
    }

    const achievement = await query;
    if (!achievement) {
      return res.status(404).json({ success: false, message: "Achievement not found" });
    }

    if (req.user.role === "student" && achievement.stuID.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (
      req.user.role === "divisionIncharge" &&
      (achievement.stuID.year !== req.user.year ||
        achievement.stuID.division !== req.user.division)
    ) {
      return res.status(403).json({ success: false, message: "Division access denied" });
    }

    const publicIds = [
      achievement.photographs.eventPhoto.publicId,
      achievement.photographs.certificate.publicId,
      achievement.course_certificate?.publicId,
    ].filter(Boolean);

    await Achievement.findByIdAndDelete(id);
    await deleteMultipleFromCloudinary(publicIds);

    return res.status(200).json({
      success: true,
      message: "Achievement deleted successfully",
    });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


module.exports = {
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getOwnAchievements,
  getAllAchievements,
  getStudentAchievements,
};