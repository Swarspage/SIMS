const mongoose = require("mongoose");
const Admission = require("../models/Admission");
const Student = require("../models/Student");

const {
  admissionCreateSchema,
  admissionUpdateSchema,
  admissionStatusSchema,
  getAdmissionsValidation,
} = require("../validators/admissionValidation");

//create admission => student | admin | DI
const createAdmission = async (req, res) => {
  try {
    const { error, value } = admissionCreateSchema.validate(req.body, {
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

    // Role-based ownership
    if (req.user.role === "student") {
      stuID = req.user.id;
    }
    else if (["admin", "divisionIncharge"].includes(req.user.role)) {
      stuID = req.body.studentId;

      if (!stuID || !mongoose.Types.ObjectId.isValid(stuID)) {
        return res.status(400).json({ success: false, message: "Invalid student ID" });
      }
    }
    else {
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
        message: "You can access students only from your division",
      });
    }

    // Prevent duplicate admission per academic year
    const existing = await Admission.findOne({
      stuID,
      academicYear: value.academicYear,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Admission already exists for this academic year",
      });
    }

    const admission = new Admission({
      stuID,
      rollno: value.rollno,
      course: value.course,
      fees: value.fees,
      isScholarshipApplied: value.isScholarshipApplied,
      academicYear: value.academicYear,

      // Server-controlled fields
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
    console.error("Create Admission Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//get student their own admissions
const getAdmissionsByStudent = async (req, res) => {
  try {
    const admissions = await Admission.find({ stuID: req.user.id })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: admissions });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//update admission => student | pending only
const updateAdmission = async (req, res) => {
  try {
    const { error, value } = admissionUpdateSchema.validate(req.body, {
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

    const admission = await Admission.findById(req.params.id)
      .populate("stuID", "year division");

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
    console.error("Update Admission Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


//delete admission => student | pending only
const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id)
      .populate("stuID", "year division");

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
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//get all admissions => admin | DI
const getAllAdmissions = async (req, res) => {
  try {
    const { error, value } = getAdmissionsValidation.validate(req.query);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const page = Number(value.page || 1);
    const limit = Math.min(Number(value.limit || 10), 50);
    const skip = (page - 1) * limit;

    const query = {};

    if (value.year) query.year = value.year;
    if (value.academicYear) query.academicYear = value.academicYear;
    if (value.filterPaid)
      query.isFeesPaid = value.filterPaid === "paid";

    // Division Incharge scope
    if (req.user.role === "divisionIncharge") {
      query.year = req.user.year;
      query.div = req.user.division;
    }

    if (value.search) {
      const regex = new RegExp(value.search, "i");
      query.$or = [
        { rollno: regex },
        { course: regex },
        { academicYear: regex },
      ];
    }

    const [data, total] = await Promise.all([
      Admission.find(query)
        .populate("stuID", "name branch year")
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
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


//update admission status => admin | DI
const updateAdmissionStatus = async (req, res) => {
  try {
    const { error } = admissionStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!admission) {
      return res.status(404).json({ success: false, message: "Admission not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Admission ${req.body.status} successfully`,
      data: admission,
    });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//get unpaid students => admin | DI
const getUnpaidStudents = async (req, res) => {
  try {
    const filter = { isFeesPaid: false };

    if (req.user.role === "divisionIncharge") {
      filter.year = req.user.year;
      filter.div = req.user.division;
    }

    const unpaid = await Admission.find(filter).populate("stuID");

    return res.status(200).json({ success: true, data: unpaid });
  } catch {
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
