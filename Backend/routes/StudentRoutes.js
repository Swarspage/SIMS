// const express = require("express");
// const router = express.Router();
// const {
//   addStudentDetails,
//   getStudentById,
//   getStudents,
//   getAllStudents, // ✅ ADD THIS IMPORT
//   getSingleStudent,
//   updateStudent,
//   deleteStudent,
//   importExcelDataWithPasswords,
//   exportAllStudentsToExcel,
// } = require("../controllers/StudentController");

// const uploadExcel = require("../middlewares/excelMulter");
// const verifyToken = require("../middlewares/VerifyToken");
// const upload = require("../middlewares/multer");
// const trimRequestBodyStrings = require("../middlewares/trimRequestBodyStrings");

// // ==================== IMPORT/EXPORT ROUTES ====================
// // route to add excel file and then send generated passwords via email --admin access
// router.post(
//   "/import",
//   verifyToken,
//   uploadExcel.single("studentData"),
//   importExcelDataWithPasswords
// );

// // route to download all student data in Excel format
// router.get("/export-students", verifyToken, exportAllStudentsToExcel);

// // ==================== CRUD ROUTES ====================
// // route to add remaining details --student
// router.post(
//   "/",
//   verifyToken,
//   upload.single("studentPhoto"),
//   trimRequestBodyStrings,
//   addStudentDetails
// );

// // route to update remaining details --student & admin
// router.put(
//   "/:studentId",
//   verifyToken,
//   upload.single("studentPhoto"),
//   trimRequestBodyStrings,
//   updateStudent
// );

// // route to delete student --student & admin
// router.delete("/:studentId", verifyToken, deleteStudent);

// // ==================== GET ROUTES (ORDER MATTERS!) ====================
// // ⚠️ Specific routes MUST come before dynamic routes (/:studentId)

// router.get("/all", verifyToken, getAllStudents); // ✅ Admin only - Get ALL students (no pagination)
// router.get("/me", verifyToken, getStudentById); // Student self
// router.get("/", verifyToken, getStudents); // Admin only - with search, filter and pagination
// router.get("/:studentId", verifyToken, getSingleStudent); // Admin only - Get single student by ID

// module.exports = router;

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

// Temporary: Test without auth
router.get("/export-students", exportAllStudentsToExcel);

// Get specific routes
router.get("/all", verifyToken, getAllStudents);
router.get("/me", verifyToken, getStudentById);

// ==================== CRUD ROUTES ====================

router.post(
  "/",
  verifyToken,
  upload.single("studentPhoto"),
  trimRequestBodyStrings,
  addStudentDetails
);

router.put(
  "/:studentId",
  verifyToken,
  upload.single("studentPhoto"),
  trimRequestBodyStrings,
  updateStudent
);

router.delete("/:studentId", verifyToken, deleteStudent);

// ==================== DYNAMIC ROUTES LAST ====================
// These come AFTER all specific routes

router.get("/", verifyToken, getStudents);
router.get("/:studentId", verifyToken, getSingleStudent);

module.exports = router;
