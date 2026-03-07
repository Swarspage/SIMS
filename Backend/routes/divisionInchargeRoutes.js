const express = require('express');
const router = express.Router();
const { importDivisionInchargeFromExcel, getAllDivisionIncharges, deleteDivisionIncharge, getSingleDivisionInchargeById, changeDivisionInchargeDetails, changeEmailOfDivisionIncharge, addSingleDivisionIncharge, getMyProfile } = require("../controllers/divisionInchargeController");
const uploadExcel = require("../middlewares/excelMulter");
const verifyToken = require("../middlewares/VerifyToken");
const upload = require("../middlewares/multer");
const trimRequestBodyStrings = require("../middlewares/trimRequestBodyStrings");

const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRoles = require("../middlewares/authorizeRoles");


const uploadMemoryStorage = require("../middlewares/multerImportExcel");
const { readLimiter, writeLimiter } = require("../middlewares/rateLimiter/rateLimiter");

// route to bulk-add excel file and then send generated passwords via email --admin access
// this  route is no longer in use, hence commented
// router.post('/import', authenticateToken, authorizeRoles("admin"), uploadMemoryStorage.single("divisionInchargeData"), importDivisionInchargeFromExcel);

// route to manually add  a single division incharge --based on the email, password should go for this single Division Incharge on given email
router.post("/", authenticateToken, authorizeRoles("admin"), writeLimiter, addSingleDivisionIncharge);


// Get All Division Incharges - Admin only
router.get('/', authenticateToken, authorizeRoles("admin"), readLimiter, getAllDivisionIncharges);

// GET my profile - DivisionIncharge
router.get("/me", authenticateToken, authorizeRoles("divisionIncharge"), readLimiter, getMyProfile);

// get single division incharge by ID(admin on clicking a Division Incharge card can see all details)
router.get("/:id", authenticateToken, authorizeRoles("admin"), readLimiter, getSingleDivisionInchargeById);


// Exisiting Division Incharge's name, div and year can be changed through this route
router.patch("/:id", authenticateToken, authorizeRoles("admin"), writeLimiter, changeDivisionInchargeDetails);

// Exisiting Division Incharge's email change:- on given newEmail, password should go onn newEmail, and newPassword and newEmail should be saved in DB by overwriting exisiting email and password
router.patch("/change-email/:id", authenticateToken, authorizeRoles("admin"), writeLimiter, changeEmailOfDivisionIncharge);

// Delete Division Incharge - Admin only
router.delete('/:id', authenticateToken, authorizeRoles("admin"), writeLimiter, deleteDivisionIncharge);


// Login Route --put this in auth --talk  to swar ki usne kaha se liya hain frontend mein
router.post('/login', require("../controllers/divisionInchargeController").loginDivisionIncharge);


module.exports = router;