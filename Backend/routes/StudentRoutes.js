const express = require('express');
const router = express.Router();
const { importStudentIDs ,addStudentDetails, getStudentById, getStudents, getSingleStudent, updateStudent, deleteStudent, importExcelDataWithPasswords, exportAllStudentsToExcel } = require("../controllers/StudentController");
const uploadExcel = require("../middlewares/excelMulter");
const verifyToken = require("../middlewares/VerifyToken");
const upload = require("../middlewares/multer");
const trimRequestBodyStrings = require("../middlewares/trimRequestBodyStrings");

const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRoles = require("../middlewares/authorizeRoles");

const uploadMemoryStorage = require("../middlewares/multerImportExcel");
const { readLimiter, writeLimiter, uploadLimiter, exportLimiter } = require("../middlewares/rateLimiter/rateLimiter");

// route to add excel file and then send generated passwords via email --admin access
router.post('/import', authenticateToken, authorizeRoles("admin", "divisionIncharge"), uploadLimiter, uploadMemoryStorage.single("studentData"), importExcelDataWithPasswords);

// route to add excel file with only studentIDs --admin access
router.post('/import-student-ids', authenticateToken, authorizeRoles("admin", "divisionIncharge"), uploadLimiter, uploadExcel.single("studentIDs"), importStudentIDs);

// route to dwnload all student data in Excel format
router.get("/export-students", authenticateToken, authorizeRoles("admin", "divisionIncharge"), exportLimiter, exportAllStudentsToExcel);

// route to add remaining details --student or admin or divisionIncharge
router.patch('/',
    authenticateToken,
    authorizeRoles("admin", "student", "divisionIncharge"),
    writeLimiter,
    upload.fields([{ name: "studentPhoto", maxCount: 1 }]),
    trimRequestBodyStrings,
    addStudentDetails
);

//route to update remaining details --student or admin or DivisionIncharge
router.put("/:studentId",
    authenticateToken,
    authorizeRoles("admin", "student", "divisionIncharge"),
    writeLimiter,
    upload.fields([{ name: "studentPhoto", maxCount: 1 }]),
    trimRequestBodyStrings,
    updateStudent
);

// route to delete student --admin or divisionIncharge
router.delete("/:studentId", authenticateToken, authorizeRoles("admin", "divisionIncharge"), writeLimiter, deleteStudent);

// GET routes
router.get("/", authenticateToken, authorizeRoles("admin", "divisionIncharge"), readLimiter, getStudents);  // Admin and DivisionIncharge --with search, filter and pagination
router.get("/me", authenticateToken, authorizeRoles("student"), readLimiter, getStudentById); // Student self
router.get("/:studentId", authenticateToken, authorizeRoles("admin", "divisionIncharge"), readLimiter, getSingleStudent); // Admin only


module.exports = router;