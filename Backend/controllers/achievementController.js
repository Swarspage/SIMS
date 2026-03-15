const mongoose = require("mongoose");
const Achievement = require("../models/Achievement");
const Student = require("../models/Student");
const { deleteMultipleFromCloudinary } = require("../helpers/cloudinary/DeleteMultipleFromCloudinary");
const { validateAndUploadFiles } = require("../helpers/cloudinary/ValidateAndUploadFiles");
const { createAchievementSchema, updateAchievementSchema, getAchievementsValidation } = require("../validators/achievementValidation");
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

//create achievement
const createAchievement = async (req, res) => {
  let uploadedFiles;
  let dbSaved = false;

  try {
    //local payload copy instead of mutating req.body directly.
    // Mutating req.body is a bad pattern — it makes the request object unpredictable
    // for any middleware or logging that runs after this point.
    const payload = { ...req.body };

    // Reshape flat date keys into the nested object Joi expects
    if (payload.dateFrom && payload.dateTo) {
      payload.date = { from: payload.dateFrom, to: payload.dateTo };
    }

    // Normalize teamMembers to array if sent as a single string (e.g. from multipart form)
    if (payload.teamMembers && typeof payload.teamMembers === "string") {
      payload.teamMembers = [payload.teamMembers];
    }

    // studentId is read from req.body and trimmed manually before use,
    const rawStudentId = typeof req.body.studentId === "string"
      ? req.body.studentId.trim()
      : req.body.studentId;

    /* Joi Validation */
    const { error, value } = createAchievementSchema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) return validationErrorResponse(res, error.details);

    let stuID;

    if (req.user.role === "student") {
      stuID = req.user.id;
    } else if (["admin", "divisionIncharge"].includes(req.user.role)) {

      if (!rawStudentId) {
        return res.status(400).json({ success: false, message: "Student ID is required" });
      }

      // Use if/else so we never fire both queries for the same input.
      // The original code ran findById first and then unconditionally ran findOne
      // when findById returned null — even for a valid ObjectId that simply didn't
      // match any document, causing a wasted second DB call.
      // An ObjectId-shaped string can never match the studentID text field, so the
      // fallback is only meaningful when the input is NOT a valid ObjectId.
      //.lean() — read-only lookup, only year/division fields are needed
      let student;
      if (mongoose.Types.ObjectId.isValid(rawStudentId)) {
        student = await Student.findById(rawStudentId).lean();
      } else {
        student = await Student.findOne({ studentID: rawStudentId }).lean();
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

//get own achievements -> student
const getOwnAchievements = async (req, res) => {
  try {
    // FIX: .lean() — read-only list endpoint, no Mongoose document methods needed
    const achievements = await Achievement.find({ stuID: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ success: true, data: achievements });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET ALL ACHIEVEMENTS (ADMIN / DI) with export 

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

    // Export branch
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

      const buffer = await exportToExcel(rows, "Achievements", achievementColumnMap);

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

    // Pagination branch
    const result = await Achievement.aggregate([
      ...pipeline,
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
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
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("GetAllAchievements Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET STUDENT ACHIEVEMENTS (ADMIN / DI) 

const getStudentAchievements = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    // FIX: .lean() — read-only lookup, only year/division fields needed for access check
    const student = await Student.findById(studentId).lean();
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    if (
      req.user.role === "divisionIncharge" &&
      (student.year !== req.user.year || student.division !== req.user.division)
    ) {
      return res.status(403).json({ success: false, message: "Division access denied" });
    }

    // FIX: .lean() — read-only list endpoint
    const achievements = await Achievement.find({ stuID: studentId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ success: true, data: achievements });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// UPDATE ACHIEVEMENT 

const updateAchievement = async (req, res) => {
  let newPublicIds = [];
  let dbSaved = false;

  try {
    // a local payload copy instead of mutating req.body directly.
    const payload = { ...req.body };

    // Reshape flat date keys into the nested object Joi expects
    if (payload.dateFrom && payload.dateTo) {
      payload.date = { from: payload.dateFrom, to: payload.dateTo };
    }

    // Normalize teamMembers to array if sent as a single string
    if (payload.teamMembers && typeof payload.teamMembers === "string") {
      payload.teamMembers = [payload.teamMembers];
    }

    /* Joi Validation */
    const { error, value } = updateAchievementSchema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) return validationErrorResponse(res, error.details);

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

    // Upload any new files
    const uploaded = {};
    if (req.files) {
      const activeFileConfigs = fileConfigs.filter(
        (config) => req.files[config.fieldName]
      );
      if (activeFileConfigs.length > 0) {
        Object.assign(uploaded, await validateAndUploadFiles(req.files, activeFileConfigs));
      }
    }

    // Collect old publicIds to delete AFTER a successful DB save.
    // Apply validated field updates via `value` FIRST, then overwrite only
    // the file fields that were actually replaced. This ensures `value` can never
    // silently clobber a file reference we just set — file fields are not part of
    // the update schema so Joi strips them, but the explicit ordering makes the
    // intent unambiguous and safe against future schema changes.
    Object.assign(achievement, value);

    const oldIds = [];

    if (uploaded.eventPhoto) {
      oldIds.push(achievement.photographs?.eventPhoto?.publicId);
      achievement.photographs.eventPhoto = uploaded.eventPhoto;
      newPublicIds.push(uploaded.eventPhoto.publicId);
    }

    if (uploaded.certificate) {
      oldIds.push(achievement.photographs?.certificate?.publicId);
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

    await achievement.save();
    dbSaved = true;

    // Safe to delete old files now that the DB record points to the new ones
    const validOldIds = oldIds.filter(Boolean);
    if (validOldIds.length) {
      await deleteMultipleFromCloudinary(validOldIds);
    }

    return res.status(200).json({
      success: true,
      message: "Achievement updated successfully",
      data: achievement,
    });
  } catch (err) {
    console.error("Update Achievement Error:", err);
    // Clean up any newly uploaded files if the DB save never succeeded
    if (!dbSaved && newPublicIds.length) {
      await deleteMultipleFromCloudinary(newPublicIds);
    }
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE ACHIEVEMENT 

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
      achievement.photographs?.eventPhoto?.publicId,
      achievement.photographs?.certificate?.publicId,
      achievement.course_certificate?.publicId,
    ].filter(Boolean);

    await Achievement.findByIdAndDelete(id);

    if (publicIds.length) {
      await deleteMultipleFromCloudinary(publicIds);
    }

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