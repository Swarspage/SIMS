const mongoose = require("mongoose");
const Activity = require("../models/Activity");
const Student = require("../models/Student");
// const Admin = require("../models/Admin");
// const cloudinary = require("../config/cloudinaryConfig");
// const { uploadToCloudinary } = require("../helpers/cloudinary/UploadToCloudinary");
const { deleteMultipleFromCloudinary } = require("../helpers/cloudinary/DeleteMultipleFromCloudinary");
const { validateAndUploadFiles } = require("../helpers/cloudinary/ValidateAndUploadFiles");
const { activityCreateSchema, activityUpdateSchema } = require("../validators/activitiesValidation");

/* FILE CONFIG */

const fileConfigs = [
  {
    fieldName: "certificate",
    allowedTypes: [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ],
    maxSize: 500 * 1024, // 500KB
    friendlyName: "Certificate",
  },
];

/* ----------------------------- CREATE ACTIVITY ----------------------------- */

const createActivity = async (req, res) => {
  let uploadedFiles;
  let dbSaved = false;

  try {
    /* Joi Validation */
    const { error, value } = activityCreateSchema.validate(req.body, {
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

    /* Role-based ownership */
    if (req.user.role === "student") {
      stuID = req.user.id;
    }
    else if (["admin", "divisionIncharge"].includes(req.user.role)) {
      stuID = req.body.studentId;

      if (!stuID || !mongoose.Types.ObjectId.isValid(stuID)) {
        return res.status(400).json({
          success: false,
          message: "Invalid student ID",
        });
      }

      const student = await Student.findById(stuID);
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
          message: "You can access students only from your division",
        });
      }
    }
    else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized role",
      });
    }

    /* File upload */
    uploadedFiles = req.file
      ? await validateAndUploadFiles(
        { certificate: [req.file] },
        fileConfigs
      )
      : {};

    const activity = new Activity({
      stuID,
      type: "Committee",
      ...value,
      certificateURL: uploadedFiles.certificate || null,
    });

    await activity.save();
    dbSaved = true;

    return res.status(201).json({
      success: true,
      message: "Committee activity created successfully",
      data: activity,
    });

  } catch (err) {
    if (!dbSaved && uploadedFiles) {
      const ids = Object.values(uploadedFiles)
        .map(f => f?.publicId)
        .filter(Boolean);

      await deleteMultipleFromCloudinary(ids);
    }

    console.error("Create Activity Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });
  }
};

/* ----------------------- GET OWN ACTIVITIES (STUDENT) ----------------------- */

const getActivityByStu = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const activities = await Activity.find({
      stuID: req.user.id,
      type: "Committee",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: activities,
    });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* -------------------- GET ACTIVITIES BY STUDENT (ADMIN / DI) -------------------- */

const getActivities = async (req, res) => {
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

    const activities = await Activity.find({
      stuID: studentId,
      type: "Committee",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: activities,
    });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ------------------------- GET ALL ACTIVITIES ------------------------- */

const getAllActivities = async (req, res) => {
  try {
    const match = { type: "Committee" };

    if (req.user.role === "divisionIncharge") {
      const students = await Student.find({
        year: req.user.year,
        division: req.user.division,
      }).select("_id");

      match.stuID = { $in: students.map(s => s._id) };
    }

    const activities = await Activity.find(match)
      .populate("stuID", "name roll year division")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: activities,
    });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ----------------------------- UPDATE ACTIVITY ----------------------------- */

const updateActivity = async (req, res) => {
  let uploadedFiles;
  let dbSaved = false;

  try {
    const { error, value } = activityUpdateSchema.validate(req.body, {
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

    const activity = await Activity.findById(req.params.id).populate(
      "stuID",
      "year division"
    );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    if (
      req.user.role === "student" &&
      activity.stuID._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (
      req.user.role === "divisionIncharge" &&
      (activity.stuID.year !== req.user.year ||
        activity.stuID.division !== req.user.division)
    ) {
      return res.status(403).json({
        success: false,
        message: "Division access denied",
      });
    }

    if (req.file) {
      uploadedFiles = await validateAndUploadFiles(
        { certificate: [req.file] },
        fileConfigs
      );

      if (activity.certificateURL?.publicId) {
        await deleteMultipleFromCloudinary([
          activity.certificateURL.publicId,
        ]);
      }

      activity.certificateURL = uploadedFiles.certificate;
    }

    Object.assign(activity, value);
    activity.type = "Committee";

    await activity.save();
    dbSaved = true;

    return res.status(200).json({
      success: true,
      message: "Committee activity updated successfully",
      data: activity,
    });

  } catch (err) {
    if (!dbSaved && uploadedFiles) {
      const ids = Object.values(uploadedFiles)
        .map(f => f?.publicId)
        .filter(Boolean);

      await deleteMultipleFromCloudinary(ids);
    }

    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ----------------------------- DELETE ACTIVITY ----------------------------- */

const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate(
      "stuID",
      "year division"
    );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    if (
      req.user.role === "student" &&
      activity.stuID._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (
      req.user.role === "divisionIncharge" &&
      (activity.stuID.year !== req.user.year ||
        activity.stuID.division !== req.user.division)
    ) {
      return res.status(403).json({
        success: false,
        message: "Division access denied",
      });
    }

    const publicIds = activity.certificateURL?.publicId
      ? [activity.certificateURL.publicId]
      : [];

    await Activity.findByIdAndDelete(req.params.id);

    if (publicIds.length) {
      await deleteMultipleFromCloudinary(publicIds);
    }

    return res.status(200).json({
      success: true,
      message: "Committee activity deleted successfully",
    });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ----------------------------- EXPORT ----------------------------- */

module.exports = {
  createActivity,
  getActivityByStu,
  getActivities,
  updateActivity,
  deleteActivity,
  getAllActivities,
};
