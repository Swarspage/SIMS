const express = require("express");
const router = express.Router();
// const verifyToken = require("../middlewares/VerifyToken");

const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRoles = require("../middlewares/authorizeRoles");
const trimRequestBodyStrings = require("../middlewares/trimRequestBodyStrings");
const { readLimiter, writeLimiter } = require("../middlewares/rateLimiter/rateLimiter");

const {
  createAdmission,
  getAdmissionsByStudent,
  updateAdmission,
  deleteAdmission,
  getAllAdmissions,
  updateAdmissionStatus,
  getUnpaidStudents,
} = require("../controllers/admissionController");

//routes
router.post("/", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), writeLimiter, trimRequestBodyStrings, createAdmission);
router.get("/my-admissions", authenticateToken, authorizeRoles("student"),readLimiter, trimRequestBodyStrings , getAdmissionsByStudent);
router.put("/:id", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), writeLimiter, trimRequestBodyStrings, updateAdmission);
router.delete("/:id", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"),writeLimiter, trimRequestBodyStrings, deleteAdmission);

//admin & DI Routes
router.get("/all", authenticateToken, authorizeRoles("admin", "divisionIncharge"), readLimiter, trimRequestBodyStrings, getAllAdmissions); //BEFORE /:id
router.put("/status/:id",  authenticateToken, authorizeRoles("admin", "divisionIncharge"), writeLimiter, trimRequestBodyStrings, updateAdmissionStatus); // Specific
router.get("/unpaid",  authenticateToken, authorizeRoles("admin", "divisionIncharge"), readLimiter, trimRequestBodyStrings, getUnpaidStudents); // Specific

module.exports = router;
