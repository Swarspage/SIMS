const express = require('express');
const router = express.Router();
const { addStudentDetails, getStudentById, getStudents, getSingleStudent, updateStudent, deleteStudent, importExcelDataWithPasswords, } = require("../controllers/StudentController");

const { importDivisionInchargeFromExcel, getAllDivisionIncharges, deleteDivisionIncharge } = require("../controllers/divisionInchargeController");
const uploadExcel = require("../middlewares/excelMulter");
const verifyToken = require("../middlewares/VerifyToken");
const upload = require("../middlewares/multer");
const trimRequestBodyStrings = require("../middlewares/trimRequestBodyStrings");

const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRoles = require("../middlewares/authorizeRoles");


const uploadMemoryStorage = require("../middlewares/multerImportExcel");

// route to add excel file and then send generated passwords via email --admin access
router.post('/import', authenticateToken, authorizeRoles("admin"), uploadMemoryStorage.single("divisionInchargeData"), importDivisionInchargeFromExcel);

// Login Route
router.post('/login', require("../controllers/divisionInchargeController").loginDivisionIncharge);

// Get All Division Incharges - Admin only
router.get('/', authenticateToken, authorizeRoles("admin"), getAllDivisionIncharges);

// Delete Division Incharge - Admin only
router.delete('/:id', authenticateToken, authorizeRoles("admin"), deleteDivisionIncharge);

module.exports = router;
