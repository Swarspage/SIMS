const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const verifyToken = require("../middlewares/VerifyToken");

const {
  createAchievement,
  getOwnAchievements,
  getAllAchievements,
  getStudentAchievementsByAdmin,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievementController");

// ==================== SPECIFIC ROUTES FIRST ====================
// These MUST come before generic routes

// Get all achievements (admin)
router.get("/all", verifyToken, getAllAchievements);

// Get student achievements by admin
router.get("/student/:studentId", verifyToken, getStudentAchievementsByAdmin);

// ==================== GENERIC ROUTES LAST ====================
// These come AFTER specific routes

// Create Achievement
router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "eventPhoto", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
  ]),
  createAchievement
);

// Get own achievements (student)
router.get("/", verifyToken, getOwnAchievements);

// Update achievement
router.put(
  "/:id",
  verifyToken,
  upload.fields([
    { name: "eventPhoto", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
  ]),
  updateAchievement
);

// Delete achievement
router.delete("/:id", verifyToken, deleteAchievement);

module.exports = router;
