const mongoose = require("mongoose");
const Activity = require("../models/Activity");
const Student = require("../models/Student");
// const Admin = require("../models/Admin");
// const cloudinary = require("../config/cloudinaryConfig");
// const { uploadToCloudinary } = require("../helpers/cloudinary/UploadToCloudinary");
const { deleteMultipleFromCloudinary } = require("../helpers/cloudinary/DeleteMultipleFromCloudinary");
const { validateAndUploadFiles } = require("../helpers/cloudinary/ValidateAndUploadFiles");
const { activityCreateSchema, activityUpdateSchema , getActivitiesValidation } = require("../validators/activitiesValidation");
const exportToExcel = require('../helpers/excel/exportToExcel');
const { transformActivity, activityColumnMap } = require('../helpers/excel/exportTransformers');


//validation err helper
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

/* CREATE ACTIVITY */

const createActivity = async (req, res) => {
  let uploadedFiles;
  let dbSaved = false;

  try {

    //studentId is required in body for admin/di, but will be ignored for students (overridden by req.user.id)
    const { studentId } = req.body;

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
      // stuID = req.body.studentId;
      // stuID = studentId;

      // if (!stuID || !mongoose.Types.ObjectId.isValid(stuID)) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Invalid student ID",
      //   });
      // }

      // const student = await Student.findById(stuID);
      // if (!student) {
      //   return res.status(404).json({
      //     success: false,
      //     message: "Student not found",
      //   });
      // }

      const rawStudentId = studentId;

      if (!rawStudentId) {
        return res.status(400).json({
          success: false,
          message: "Student ID is required",
        });
      }

      // Support both MongoDB ObjectId and studentID (e.g. "2024FHIT009")
      let student;
      if (mongoose.Types.ObjectId.isValid(rawStudentId)) {
        student = await Student.findById(rawStudentId);
      } else {
        student = await Student.findOne({ studentID: rawStudentId });
      }

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }

      stuID = student._id;

      //end

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


//get all activities with export option
const getAllActivities = async (req, res) => {
  try {
    const { error , value } = getActivitiesValidation.validate(req.query);
    if(error) 
      return validationErrorResponse(res, error.details);

    const isExport = req.query.export === "true";
    const page = Math.max(1 , Number(value.page || 1));
    const limit = Math.min(Number(value.limit || 10), 50);    //single capped value is used everywhwre
    const skip = (page - 1) * limit;

    const { year, division, search } = value;

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

    const match = { type: "Committee" };

    //role filter
    if (req.user.role === "divisionIncharge") {
      match["student.year"] = req.user.year;
      match["student.division"] = req.user.division;
    }

    if (req.user.role === "admin") {
      if (year) match["student.year"] = year;
      if (division) match["student.division"] = division;
    }

    //search filter
    if (search) {
      const safeSearch = search.replace(
        /[-[\]{}()*+?.,\\^$|#\s]/g,
        "\\$&"
      );

      match.$or = [
        { title: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
        { "student.name.firstName": { $regex: safeSearch, $options: "i" } },
        { "student.name.lastName": { $regex: safeSearch, $options: "i" } },
      ];
    }

    pipeline.push({ $match: match });

    //export branch
    if (isExport) {
      const activities = await Activity.aggregate([
        ...pipeline,
        { $sort: { createdAt: -1 } }, // sort before project so createdAt is still available
        { $limit: 5000 },             // row cap to prevent memory overload
        {
          $project: {
            type: 1,
            title: 1,
            description: 1,
            date: 1,
            certificateURL: 1,

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

      const rows = activities.map(transformActivity);

      const buffer = await exportToExcel(
        rows,
        "Activities",
        activityColumnMap
      );

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="activities.xlsx"'
      );

      return res.send(buffer);
    }

    //pagination branch
    const result = await Activity.aggregate([
      ...pipeline,
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: (limit) },   //uses the sm capped limit as skip
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
      limit,
      totalPages: Math.ceil(total / limit),
    });

  } catch (err) {
    console.error("GetAllActivities Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


//update activity
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
