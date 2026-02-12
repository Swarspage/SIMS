// const Activity = require("../models/Activity");
// const Student = require("../models/Student");
// const Admin = require("../models/Admin");
// const { uploadToCloudinary } = require("../helpers/UploadToCloudinary");
// const { activitySchema } = require("../validators/activitiesValidation");
// const cloudinary = require("../config/cloudinaryConfig");

// // Allowed certificate size/type
// const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// const ALLOWED_CERT_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

// // Helper: Validate uploaded file
// const validateFile = (file, allowedTypes, maxSize) => {
//   if (!file) return false;
//   if (!allowedTypes.includes(file.mimetype)) return false;
//   if (file.size > maxSize) return false;
//   return true;
// };

// // Helper: Safe delete from Cloudinary
// const safeDeleteFile = async (publicId) => {
//   try {
//     if (publicId) await cloudinary.uploader.destroy(publicId);
//   } catch (err) {
//     console.error("Error deleting file from Cloudinary:", err);
//   }
// };

// // CREATE Committee Activity (Student only)
// const createActivity = async (req, res) => {
//   let uploadedFileId = null;
//   try {
//     const { id, role } = req.user;
//     if (role !== "student")
//       return res.status(403).json({ success: false, message: "Only students can create committee activities" });

//     const student = await Student.findById(id);
//     if (!student)
//       return res.status(404).json({ success: false, message: "Student not found" });

//     // Validate body (without type)
//     const { error } = activitySchema.validate(req.body);
//     if (error)
//       return res.status(400).json({ success: false, message: error.details[0].message });

//     let certificate = null;
//     if (req.file) {
//       if (!validateFile(req.file, ALLOWED_CERT_TYPES, MAX_FILE_SIZE))
//         return res.status(400).json({ success: false, message: "Certificate must be JPG/PNG/PDF and <= 5MB" });

//       certificate = await uploadToCloudinary(req.file.path, "certificates");
//       uploadedFileId = certificate.publicId;
//     }

//     // Force type = Committee
//     const newActivity = new Activity({
//       stuID: id,
//       type: "Committee",
//       ...req.body,
//       certificateURL: certificate ? { url: certificate.url, publicId: certificate.publicId } : null,
//     });

//     await newActivity.save();
//     const populated = await newActivity.populate("stuID", "name roll branch year");

//     res.status(201).json({ success: true, message: "Committee activity created successfully", data: populated });
//   } catch (err) {
//     if (uploadedFileId) await safeDeleteFile(uploadedFileId);
//     console.error("Error creating activity:", err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // GET Committee Activities by Student (Student only)
// const getActivityByStu = async (req, res) => {
//   try {
//     const { id, role } = req.user;
//     if (role !== "student")
//       return res.status(403).json({ success: false, message: "Only students can view their activities" });

//     const activities = await Activity.find({ stuID: id, type: "Committee" })
//       .populate("stuID", "name roll branch year")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: activities });
//   } catch (err) {
//     console.error("Error fetching activities:", err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // GET Activities by Student ID (Admin or division incharge)
// const getActivities = async (req, res) => {
//   try {
//     const { id, role } = req.user;
//     if (role !== "admin")
//       return res.status(403).json({ success: false, message: "Only admins can view committee activities" });

//     const student = await Student.findById(req.params.studentId);
//     if (!student)
//       return res.status(404).json({ success: false, message: "Student not found" });

//     const { search, studentName, page = 1, limit = 10 } = req.query;
//     const query = { stuID: req.params.studentId, type: "Committee" };

//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } },
//       ];
//     }

//     const skip = (page - 1) * limit;

//     let activitiesQuery = Activity.find(query)
//       .populate("stuID", "name roll branch year")
//       .sort({ createdAt: -1 });

//     if (studentName) {
//       activitiesQuery = activitiesQuery.populate({
//         path: "stuID",
//         match: { name: { $regex: studentName, $options: "i" } },
//       });
//     }

//     const activities = await activitiesQuery.skip(parseInt(skip)).limit(parseInt(limit));
//     const total = await Activity.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       total,
//       page: parseInt(page),
//       pages: Math.ceil(total / limit),
//       data: activities.filter(act => act.stuID),
//     });
//   } catch (err) {
//     console.error("Error fetching student activities:", err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // UPDATE Committee Activity (Student/Admin)
// const updateActivity = async (req, res) => {
//   let uploadedFileId = null;
//   try {
//     const { id: userId, role } = req.user;
//     const activity = await Activity.findById(req.params.id);
//     if (!activity) return res.status(404).json({ success: false, message: "Activity not found" });

//     if (role === "student" && activity.stuID.toString() !== userId)
//       return res.status(403).json({ success: false, message: "Unauthorized" });

//     if (role === "admin") {
//       const admin = await Admin.findById(userId);
//       if (!admin) return res.status(403).json({ success: false, message: "Admin not authorized" });
//     }

//     const { error } = activitySchema.validate(req.body, { presence: "optional" });
//     if (error)
//       return res.status(400).json({ success: false, message: error.details[0].message });

//     if (req.file) {
//       if (!validateFile(req.file, ALLOWED_CERT_TYPES, MAX_FILE_SIZE))
//         return res.status(400).json({ success: false, message: "Certificate must be JPG/PNG/PDF and <= 5MB" });

//       if (activity.certificateURL?.publicId)
//         await safeDeleteFile(activity.certificateURL.publicId);

//       const uploaded = await uploadToCloudinary(req.file.path, "certificates");
//       uploadedFileId = uploaded.publicId;
//       activity.certificateURL = { url: uploaded.url, publicId: uploaded.publicId };
//     }

//     Object.assign(activity, req.body, { type: "Committee" }); // Always keep Committee
//     await activity.save();

//     res.status(200).json({ success: true, message: "Committee activity updated successfully", data: activity });
//   } catch (err) {
//     if (uploadedFileId) await safeDeleteFile(uploadedFileId);
//     console.error("Error updating activity:", err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // DELETE Committee Activity (Student/Admin)
// const deleteActivity = async (req, res) => {
//   try {
//     const { id: userId, role } = req.user;
//     const activity = await Activity.findById(req.params.id);
//     if (!activity)
//       return res.status(404).json({ success: false, message: "Activity not found" });

//     if (role === "student" && activity.stuID.toString() !== userId)
//       return res.status(403).json({ success: false, message: "Unauthorized" });

//     if (role === "admin") {
//       const admin = await Admin.findById(userId);
//       if (!admin) return res.status(403).json({ success: false, message: "Admin not authorized" });
//     }

//     if (activity.certificateURL?.publicId)
//       await safeDeleteFile(activity.certificateURL.publicId);

//     await activity.deleteOne();

//     res.status(200).json({ success: true, message: "Committee activity deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting activity:", err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // GET All Committee Activities (Admin only)
// const getAllActivities = async (req, res) => {
//   try {
//     const { id, role } = req.user;
//     if (role !== "admin")
//       return res.status(403).json({ success: false, message: "Access denied" });

//     const admin = await Admin.findById(id);
//     if (!admin)
//       return res.status(403).json({ success: false, message: "Admin not authorized" });

//     const { search, studentName, page = 1, limit = 10 } = req.query;
//     const query = { type: "Committee" };

//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } },
//       ];
//     }

//     let activitiesQuery = Activity.find(query)
//       .populate("stuID", "name roll branch year")
//       .sort({ createdAt: -1 });

//     if (studentName) {
//       activitiesQuery = activitiesQuery.populate({
//         path: "stuID",
//         match: { name: { $regex: studentName, $options: "i" } },
//       });
//     }

//     const skip = (page - 1) * limit;
//     const activities = await activitiesQuery.skip(parseInt(skip)).limit(parseInt(limit));
//     const total = await Activity.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       total,
//       page: parseInt(page),
//       pages: Math.ceil(total / limit),
//       data: activities.filter(act => act.stuID),
//     });
//   } catch (err) {
//     console.error("Error fetching activities:", err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// module.exports = {
//   createActivity,
//   getActivityByStu,
//   getActivities,
//   updateActivity,
//   deleteActivity,
//   getAllActivities,
// };


const mongoose = require("mongoose");
const Activity = require("../models/Activity");
const Student = require("../models/Student");
// const Admin = require("../models/Admin");
// const cloudinary = require("../config/cloudinaryConfig");
// const { uploadToCloudinary } = require("../helpers/UploadToCloudinary");
const { deleteMultipleFromCloudinary } = require("../helpers/DeleteMultipleFromCloudinary");
const { validateAndUploadFiles } = require("../helpers/ValidateAndUploadFiles");
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
