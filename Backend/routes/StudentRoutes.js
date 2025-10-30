// const express = require('express');
// const router = express.Router();
// const {addStudentDetails, getStudentById, getStudents, getSingleStudent, updateStudent, deleteStudent, importExcelDataWithPasswords, exportAllStudentsToExcel } = require("../controllers/StudentController");
// const uploadExcel = require("../middlewares/excelMulter");
// const verifyToken =require ("../middlewares/VerifyToken");
// const upload = require("../middlewares/multer");
// const trimRequestBodyStrings= require("../middlewares/trimRequestBodyStrings");

// // route to add excel file and then send generated passwords via email --admin access
// router.post('/import', verifyToken ,uploadExcel.single("studentData"), importExcelDataWithPasswords );

// // route to dwnload all student data in Excel format
// router.get("/export-students", verifyToken, exportAllStudentsToExcel);

// // route to add remaining details --student
// router.post('/', verifyToken ,upload.single("studentPhoto"), trimRequestBodyStrings, addStudentDetails );

// //route to update remaining details --student & admin
// router.put("/:studentId", verifyToken, upload.single("studentPhoto"), trimRequestBodyStrings, updateStudent);

// // route to delete student --student & admin
// router.delete("/:studentId", verifyToken, deleteStudent);

// // GET routes
// router.get("/", verifyToken, getStudents);  // Admin onnly --with search, filter and pagination
// router.get("/me", verifyToken, getStudentById); // Student self
// router.get("/:studentId", verifyToken, getSingleStudent); // Admin only

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  addStudentDetails,
  getStudentById,
  getStudents,
  getAllStudents, // ✅ ADD THIS IMPORT
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

// ==================== IMPORT/EXPORT ROUTES ====================
// route to add excel file and then send generated passwords via email --admin access
router.post(
  "/import",
  verifyToken,
  uploadExcel.single("studentData"),
  importExcelDataWithPasswords
);

// route to download all student data in Excel format
router.get("/export-students", verifyToken, exportAllStudentsToExcel);

// ==================== CRUD ROUTES ====================
// route to add remaining details --student
router.post(
  "/",
  verifyToken,
  upload.single("studentPhoto"),
  trimRequestBodyStrings,
  addStudentDetails
);

// route to update remaining details --student & admin
router.put(
  "/:studentId",
  verifyToken,
  upload.single("studentPhoto"),
  trimRequestBodyStrings,
  updateStudent
);

// route to delete student --student & admin
router.delete("/:studentId", verifyToken, deleteStudent);

// ==================== GET ROUTES (ORDER MATTERS!) ====================
// ⚠️ Specific routes MUST come before dynamic routes (/:studentId)

router.get("/all", verifyToken, getAllStudents); // ✅ Admin only - Get ALL students (no pagination)
router.get("/me", verifyToken, getStudentById); // Student self
router.get("/", verifyToken, getStudents); // Admin only - with search, filter and pagination
router.get("/:studentId", verifyToken, getSingleStudent); // Admin only - Get single student by ID

module.exports = router;
