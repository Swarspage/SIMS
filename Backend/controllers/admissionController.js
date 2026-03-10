const mongoose = require("mongoose");
const Admission = require("../models/Admission");
const Student = require("../models/Student");

const {
  admissionCreateSchema,
  admissionUpdateSchema,
  admissionStatusSchema,
  getAdmissionsValidation,
} = require("../validators/admissionValidation");

const exportToExcel = require("../helpers/excel/exportToExcel");
const { transformAdmission, admissionColumnMap } = require("../helpers/excel/exportTransformers");

//helper
//Build a 400 validation-error response from Joi details 
const validationErrorResponse = (res, details) =>
  res.status(400).json({
    success: false,
    message: "Validation failed",
    errors: details.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    })),
  });


// create admission => student | admin | DI
const createAdmission = async (req, res) => {
  try {
    const { error, value } = admissionCreateSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) return validationErrorResponse(res, error.details);

    let stuID;

    // Role-based ownership
    if (req.user.role === "student") {
      stuID = req.user.id;
    } else if (["admin", "divisionIncharge"].includes(req.user.role)) {
      stuID = req.body.studentId;

      if (!stuID || !mongoose.Types.ObjectId.isValid(stuID)) {
        return res.status(400).json({ success: false, message: "Invalid student ID" });
      }
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized role" });
    }

    const student = await Student.findById(stuID);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Division Incharge restriction
    if (
      req.user.role === "divisionIncharge" &&
      (student.year !== req.user.year || student.division !== req.user.division)
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only manage students within your own division",
      });
    }

    // All validated fields from value are explicitly assigned to the model
    const admission = new Admission({
      stuID,
      rollno: value.rollno,
      course: value.course,
      fees: value.fees,
      isScholarshipApplied: value.isScholarshipApplied,
      scholarshipNotAppliedReason: value.scholarshipNotAppliedReason,
      academicYear: value.academicYear,
      isMahadbtFormSubmitted: value.isMahadbtFormSubmitted,
      mahadbtFilledDate: value.mahadbtFilledDate,
      mahadbtNotFilledReason: value.mahadbtNotFilledReason,
      hasMigrationCertificate: value.hasMigrationCertificate,
      migrationExpectedDate: value.migrationExpectedDate,
      migrationNotAvailableReason: value.migrationNotAvailableReason,

      // Sourced from the student record — not trusted from client input
      year: student.year,
      div: student.division,
    });

    await admission.save();

    return res.status(201).json({
      success: true,
      message: "Admission submitted successfully",
      data: admission,
    });
  } catch (err) {
    // Unique index violation: duplicate admission for the same academic year
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Admission already exists for this academic year for the student.",
      });
    }
    console.error("createAdmission error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


// get student their own admissions
const getAdmissionsByStudent = async (req, res) => {
  try {
    const admissions = await Admission.find({ stuID: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: admissions });
  } catch (err) {
    console.error("getAdmissionsByStudent error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


// update admission => student | admin | DI | pending only
const updateAdmission = async (req, res) => {
  try {
    // FIX: "admin" added to the allowed roles list
    if (!["student", "admin", "divisionIncharge"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const { error, value } = admissionUpdateSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) return validationErrorResponse(res, error.details);

    const admission = await Admission.findById(req.params.id).populate("stuID", "year division");

    if (!admission) {
      return res.status(404).json({ success: false, message: "Admission not found" });
    }

    if (admission.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Cannot update after approval or rejection",
      });
    }

    // Ownership checks
    if (
      req.user.role === "student" &&
      admission.stuID._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (
      req.user.role === "divisionIncharge" &&
      (admission.stuID.year !== req.user.year ||
        admission.stuID.division !== req.user.division)
    ) {
      return res.status(403).json({ success: false, message: "Division access denied" });
    }

    Object.assign(admission, value);
    await admission.save();

    return res.status(200).json({
      success: true,
      message: "Admission updated successfully",
      data: admission,
    });
  } catch (err) {
    console.error("updateAdmission error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


// delete admission => student | DI | pending only
const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id).populate("stuID", "year division");

    if (!admission) {
      return res.status(404).json({ success: false, message: "Admission not found" });
    }

    if (admission.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete after approval or rejection",
      });
    }

    if (
      req.user.role === "student" &&
      admission.stuID._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (
      req.user.role === "divisionIncharge" &&
      (admission.stuID.year !== req.user.year ||
        admission.stuID.division !== req.user.division)
    ) {
      return res.status(403).json({ success: false, message: "Division access denied" });
    }

    await admission.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Admission deleted successfully",
    });
  } catch (err) {
    console.error("deleteAdmission error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


// get all admissions with optional export => admin | DI
const getAllAdmissions = async (req, res) => {
  try {
    const { error, value } = getAdmissionsValidation.validate(req.query);
    if (error) return validationErrorResponse(res, error.details);

    const isExport = req.query.export === "true";

    const page = Math.max(1, Number(value.page || 1));
    const limit = Math.min(Number(value.limit || 10), 50);
    const skip = (page - 1) * limit;

    const query = {};

    // Role-scope restrictions
    if (req.user.role === "divisionIncharge") {
      query.year = req.user.year;
      query.div = req.user.division;
    } else {
      if (value.year) query.year = value.year;
    }

    if (value.academicYear) query.academicYear = value.academicYear;

    // Paid / unpaid filter
    if (value.filterPaid === "paid") {
      query.isFeesPaid = true;
    } else if (value.filterPaid === "unpaid") {
      query.isFeesPaid = false;
    }

    // Search across roll number, course, and academic year
    if (value.search) {
      const escaped = value.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      const regex = new RegExp(escaped, "i");
      query.$or = [
        { rollno: regex },
        { course: regex },
        { academicYear: regex },
      ];
    }

    // Export branch — capped at 5,000 rows to prevent memory overload
    if (isExport) {
      const admissions = await Admission.find(query)
        .populate("stuID", "name branch studentID")
        .sort({ createdAt: -1 })
        .limit(5000);

      const rows = admissions.map(transformAdmission);
      const buffer = await exportToExcel(rows, "Admissions", admissionColumnMap);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", 'attachment; filename="admissions.xlsx"');
      return res.send(buffer);
    }

    // Paginated branch
    const [data, total] = await Promise.all([
      Admission.find(query)
        .populate("stuID", "name branch studentID")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Admission.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("getAllAdmissions error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


// update admission status => admin | DI
const updateAdmissionStatus = async (req, res) => {
  try {
    const { error } = admissionStatusSchema.validate(req.body);
    if (error) return validationErrorResponse(res, error.details);

    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({ success: false, message: "Admission not found" });
    }

    if (admission.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Cannot change status after approval or rejection",
      });
    }

    if (
      req.user.role === "divisionIncharge" &&
      (admission.year !== req.user.year || admission.div !== req.user.division)
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this admission",
      });
    }

    admission.status = req.body.status;
    await admission.save();

    return res.status(200).json({
      success: true,
      message: `Admission ${req.body.status} successfully`,
      data: admission,
    });
  } catch (err) {
    console.error("updateAdmissionStatus error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


// get unpaid students => admin | DI
const getUnpaidStudents = async (req, res) => {
  try {
    const filter = { isFeesPaid: false };

    // Division Incharge sees only their own division
    if (req.user.role === "divisionIncharge") {
      filter.year = req.user.year;
      filter.div = req.user.division;
    }

    const unpaid = await Admission.find(filter)
      .populate("stuID", "name studentID branch year division mobileNo email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: unpaid });
  } catch (err) {
    console.error("getUnpaidStudents error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


module.exports = {
  createAdmission,
  getAdmissionsByStudent,
  updateAdmission,
  deleteAdmission,
  getAllAdmissions,
  updateAdmissionStatus,
  getUnpaidStudents,
};