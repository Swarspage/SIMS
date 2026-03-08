const express = require("express");
const router = express.Router();
// const verifyToken = require("../middlewares/VerifyToken");

const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRoles = require("../middlewares/authorizeRoles");
const trimRequestBodyStrings = require("../middlewares/trimRequestBodyStrings");
const { readLimiter, writeLimiter } = require("../middlewares/rateLimiter/rateLimiter");

const {
  addSemInfo,
  updateSemInfo,
  deleteSemInfo,
  getAllSemInfos,
  getOwnSemInfos,
  getStudentSemInfos
} = require("../controllers/semInfoController");

// Admin or DI routes 
router.get("/all", authenticateToken, authorizeRoles("admin", "divisionIncharge"), readLimiter, trimRequestBodyStrings, getAllSemInfos);
router.get("/student/:studentId", authenticateToken, authorizeRoles("admin", "divisionIncharge"), readLimiter, trimRequestBodyStrings, getStudentSemInfos);

// Student routes
router.get("/", authenticateToken, authorizeRoles("student"), readLimiter, trimRequestBodyStrings, getOwnSemInfos);
router.post("/", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), writeLimiter, trimRequestBodyStrings, addSemInfo);
router.put("/:id", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), writeLimiter ,trimRequestBodyStrings, updateSemInfo);
router.delete("/:id", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), writeLimiter, trimRequestBodyStrings, deleteSemInfo);

module.exports = router;
