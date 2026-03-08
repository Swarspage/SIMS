const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
// const verifyToken = require("../middlewares/VerifyToken");

const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRoles = require("../middlewares/authorizeRoles");
const trimRequestBodyStrings = require("../middlewares/trimRequestBodyStrings");
const { readLimiter, writeLimiter , uploadLimiter } = require("../middlewares/rateLimiter/rateLimiter");


const {
  createAchievement,
  getOwnAchievements,
  getAllAchievements,
  getStudentAchievements,
  updateAchievement,
  deleteAchievement,
  // getSingleAchievement,

} = require("../controllers/achievementController");

//Create Achievement (accept 3–4 files)
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "student", "divisionIncharge"),
  uploadLimiter,
  upload.fields([
    { name: "eventPhoto", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "course_certificate", maxCount: 1 }, // new field
  ]),
  trimRequestBodyStrings,
  createAchievement
);

//Get achievements of logged-in student
router.get("/", authenticateToken, authorizeRoles("student"),readLimiter, trimRequestBodyStrings , getOwnAchievements);

// Update Achievement (allow replacing any uploaded file)
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "student", "divisionIncharge"),
  uploadLimiter,
  upload.fields([
    { name: "eventPhoto", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "course_certificate", maxCount: 1 },
  ]),
  trimRequestBodyStrings,
  updateAchievement
);

//Delete an achievement
router.delete("/:id", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), writeLimiter, trimRequestBodyStrings , deleteAchievement);

//Get all achievements (with filtering options) -> admin or divisionIncharge
router.get("/all", authenticateToken, authorizeRoles("admin", "divisionIncharge"), readLimiter , trimRequestBodyStrings , getAllAchievements);

//Get specific student's achievements -> admin or divisionIncharge
router.get("/student/:studentId", authenticateToken, authorizeRoles("admin", "divisionIncharge"), readLimiter, trimRequestBodyStrings , getStudentAchievements);

// Get Single Achievement by ID  -- student | admin | divisionInchargee
// router.get(
//   "/single/:achievementId",
//   authenticateToken,
//   authorizeRoles("student", "admin", "divisionIncharge"),
//   getSingleAchievement
// );


module.exports = router;
