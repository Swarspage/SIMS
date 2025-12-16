const express = require("express");
const router = express.Router();
const { createPlacement, updatePlacement, deletePlacement, getPlacements, getOwnPlacements, getPlacementsByStudentId, getSinglePlacement, } = require("../controllers/PlacementController");

const verifyToken =require ("../middlewares/VerifyToken");

const upload=require("../middlewares/multer");


const authenticateToken= require("../middlewares/authenticateToken");
const authorizeRoles=require("../middlewares/authorizeRoles");
const trimRequestBodyStrings=require("../middlewares/trimRequestBodyStrings");


// Create Placement --student or admin or divisionIncharge
router.post("/",
    authenticateToken , 
    authorizeRoles("admin", "student", "divisionIncharge"),
    upload.fields([{ name: "placementProof", maxCount: 1 }]),
    trimRequestBodyStrings,
    createPlacement
);

// Update Placement --student or admin or divisionIncharge
router.put(
    "/:placementId",
    authenticateToken , 
    authorizeRoles("admin", "student", "divisionIncharge"),
    upload.fields([{ name: "placementProof", maxCount: 1 }]),
    trimRequestBodyStrings,
    updatePlacement
);

// Delete Placement --student or admin or divisionIncharge
router.delete("/:placementId", authenticateToken , authorizeRoles("admin", "student", "divisionIncharge"), trimRequestBodyStrings, deletePlacement);

// Get Logged-in Student’s Own Placements --student only
router.get("/me", authenticateToken , authorizeRoles("student"), trimRequestBodyStrings, getOwnPlacements);

// Get All Placements --admin or divisionIncharge
router.get("/", authenticateToken , authorizeRoles("admin", "divisionIncharge"), trimRequestBodyStrings, getPlacements);

// Get Placements of Specific Student --admin or divisionIncharge
router.get("/student-placement-by-admin/:studentId", authenticateToken , authorizeRoles("admin", "divisionIncharge"), trimRequestBodyStrings, getPlacementsByStudentId);

// Get Single Placement by ID --student or admin or divisionIncharge
router.get("/:placementId", authenticateToken , authorizeRoles("admin", "student", "divisionIncharge"), trimRequestBodyStrings, getSinglePlacement);


module.exports = router;
