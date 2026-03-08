const express = require("express");
const router = express.Router();
// const verifyToken = require("../middlewares/VerifyToken");
const upload = require("../middlewares/multer");


const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRoles = require("../middlewares/authorizeRoles");
const trimRequestBodyStrings = require("../middlewares/trimRequestBodyStrings");
const { readLimiter, writeLimiter , uploadLimiter } = require("../middlewares/rateLimiter/rateLimiter");

const { createActivity , getActivityByStu , getActivities, updateActivity , deleteActivity , getAllActivities } = require("../controllers/activitiesController");

//Student Routes
router.post("/", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), uploadLimiter, trimRequestBodyStrings , upload.single("certificate"), createActivity);
router.get("/", authenticateToken, authorizeRoles("student"), readLimiter, trimRequestBodyStrings , getActivityByStu);
router.put("/:id", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), uploadLimiter, trimRequestBodyStrings , upload.single("certificate"), updateActivity);
router.delete("/:id", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), writeLimiter, trimRequestBodyStrings , deleteActivity);

//admin & DI Routes
//Get all activities (with filtering options) -> admin or divisionIncharge

router.get("/all", authenticateToken, authorizeRoles("admin", "divisionIncharge"), readLimiter, trimRequestBodyStrings , getAllActivities);

//Get specific student's activity -> admin or divisionIncharge
router.get("/student/:studentId", authenticateToken, authorizeRoles("admin", "divisionIncharge"), readLimiter , trimRequestBodyStrings , getActivities);

module.exports = router;
