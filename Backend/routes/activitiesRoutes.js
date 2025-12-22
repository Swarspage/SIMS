const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/VerifyToken");
const upload = require("../middlewares/multer");


const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRoles = require("../middlewares/authorizeRoles");
const trimRequestBodyStrings = require("../middlewares/trimRequestBodyStrings");

const { createActivity , getActivityByStu , getActivitiesByStudentAdmin , updateActivity , deleteActivity , getAllActivities } = require("../controllers/activitiesController");

//Student Routes
router.post("/", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), trimRequestBodyStrings , upload.single("certificate"), createActivity);
router.get("/", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), trimRequestBodyStrings , getActivityByStu);
router.put("/:id", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), trimRequestBodyStrings , upload.single("certificate"), updateActivity);
router.delete("/:id", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), trimRequestBodyStrings , deleteActivity);

// Admin Routes
router.get("/all", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), trimRequestBodyStrings , getAllActivities);
router.get("/student/:studentId", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), trimRequestBodyStrings , getActivitiesByStudentAdmin);

module.exports = router;
