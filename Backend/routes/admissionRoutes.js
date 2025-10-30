const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/VerifyToken");
const {
  createAdmission,
  getAdmissionsByStudent,
  updateAdmission,
  deleteAdmission,
  getAllAdmissions,
  updateAdmissionStatus,
  getUnpaidStudents,
} = require("../controllers/admissionController");

// ==================== STUDENT ROUTES ====================
router.post("/", verifyToken, createAdmission);
router.get("/my-admissions", verifyToken, getAdmissionsByStudent);
router.put("/:id", verifyToken, updateAdmission);
router.delete("/:id", verifyToken, deleteAdmission);

// ==================== ADMIN ROUTES (ORDER MATTERS!) ====================
// ⚠️ IMPORTANT: Specific routes MUST come before dynamic routes (/:id)

router.get("/all", verifyToken, getAllAdmissions); // ✅ BEFORE /:id
router.put("/status/:id", verifyToken, updateAdmissionStatus); // Specific
router.get("/unpaid", verifyToken, getUnpaidStudents); // Specific

module.exports = router;
