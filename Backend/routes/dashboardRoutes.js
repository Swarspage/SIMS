const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const authenticateToken= require("../middlewares/authenticateToken");
const authorizeRoles=require("../middlewares/authorizeRoles");
const { readLimiter, writeLimiter } = require("../middlewares/rateLimiter/rateLimiter");


router.get("/student", authenticateToken, authorizeRoles("student"), readLimiter, dashboardController.studentDashboard);

router.get("/admin", authenticateToken, authorizeRoles("admin"), readLimiter,  dashboardController.adminDashboard);

router.get("/divisionIncharge", authenticateToken, authorizeRoles("divisionIncharge"), readLimiter,  dashboardController.divisionDashboard);

module.exports = router;