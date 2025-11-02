const express = require("express");
const router = express.Router();
const {
  addStudentDetails,
  getStudentById,
  getStudents,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  importExcelDataWithPasswords,
  exportAllStudentsToExcel,
} = require("../controllers/StudentController");

const uploadExcel = require("../middlewares/excelMulter");
const verifyToken = require("../middlewares/VerifyToken");
const upload = require("../middlewares/multer");
const trimRequestBodyStrings = require("../middlewares/trimRequestBodyStrings");

// ==================== SPECIFIC ROUTES FIRST ====================
// ⚠️ These MUST come before dynamic routes (:studentId)

// Import/Export routes
router.post(
  "/import",
  verifyToken,
  uploadExcel.single("studentData"),
  importExcelDataWithPasswords
);

// Export route
router.get("/export-students", exportAllStudentsToExcel);

// Get all students and get my data
router.get("/all", verifyToken, getAllStudents);
router.get("/me", verifyToken, getStudentById);

// ==================== CRUD ROUTES ====================

// Create student details (POST)
router.post(
  "/",
  verifyToken,
  upload.single("studentPhoto"),
  trimRequestBodyStrings,
  addStudentDetails
);

// ==================== DYNAMIC ROUTES LAST ====================
// ⚠️ All specific named routes MUST come BEFORE these

// Update student (PUT)
router.put(
  "/:studentId",
  verifyToken,
  upload.single("studentPhoto"),
  trimRequestBodyStrings,
  updateStudent
);

// Delete student (DELETE)
router.delete("/:studentId", verifyToken, deleteStudent);

// Get all students with pagination (GET)
router.get("/", verifyToken, getStudents);

// Get single student by ID (GET)
router.get("/:studentId", verifyToken, getSingleStudent);

module.exports = router;
