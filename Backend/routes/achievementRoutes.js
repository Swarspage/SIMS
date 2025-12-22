const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
// const verifyToken = require("../middlewares/VerifyToken");

const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRoles = require("../middlewares/authorizeRoles");
const trimRequestBodyStrings = require("../middlewares/trimRequestBodyStrings");


const {
  createAchievement,
  getOwnAchievements,
  getAllAchievements,
  getStudentAchievementsByAdmin,
  updateAchievement,
  deleteAchievement,
  // getSingleAchievement,

} = require("../controllers/achievementController");

//Create Achievement (accept 3–4 files)
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "student", "divisionIncharge"),
  upload.fields([
    { name: "eventPhoto", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "course_certificate", maxCount: 1 }, // new field
  ]),
  trimRequestBodyStrings,
  createAchievement
);

//Get achievements of logged-in student
router.get("/me", authenticateToken, authorizeRoles("student"), trimRequestBodyStrings , getOwnAchievements);

// Update Achievement (allow replacing any uploaded file)
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "student", "divisionIncharge"),
  upload.fields([
    { name: "eventPhoto", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "course_certificate", maxCount: 1 },
  ]),
  trimRequestBodyStrings,
  updateAchievement
);

//Delete an achievement
router.delete("/:id", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), trimRequestBodyStrings , deleteAchievement);

//Admin: Get all achievements (with filtering options) -> admin or divisionIncharge
router.get("/", authenticateToken, authorizeRoles("admin", "divisionIncharge"), trimRequestBodyStrings , getAllAchievements);

//Admin: Get specific student's achievements -> admin or divisionIncharge
router.get("/student/:studentId", authenticateToken, authorizeRoles("admin", "divisionIncharge"), trimRequestBodyStrings , getStudentAchievementsByAdmin);

// Get Single Achievement by ID  -- student | admin | divisionIncharge
// router.get(
//   "/single/:achievementId",
//   authenticateToken,
//   authorizeRoles("student", "admin", "divisionIncharge"),
//   getSingleAchievement
// );


module.exports = router;
