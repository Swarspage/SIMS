const express = require("express");
const router = express.Router();

const { createInternship , getInternships, getOwnInternships , updateInternship , deleteInternship, getStudentInternshipsByAdmin, getSingleInternship } = require("../controllers/internController");


const upload=require("../middlewares/multer");

const authenticateToken= require("../middlewares/authenticateToken");
const authorizeRoles=require("../middlewares/authorizeRoles");
const trimRequestBodyStrings=require("../middlewares/trimRequestBodyStrings");
const { readLimiter, writeLimiter } = require("../middlewares/rateLimiter/rateLimiter");

// create internship --admin or student or divisionIncharge
router.post("/" , 
    authenticateToken , 
    authorizeRoles("admin", "student", "divisionIncharge"),
    writeLimiter,
    upload.fields([
        { name: "internshipReport", maxCount: 1 },
        { name: "photoProof", maxCount: 1 },
    ]), 
    trimRequestBodyStrings,
    createInternship
);

//get all internships --admin or divisionIncharge(division restriction in controller)
router.get("/" , authenticateToken, authorizeRoles("admin", "divisionIncharge"), readLimiter, trimRequestBodyStrings, getInternships);

// get all internships of a student --student
router.get("/me",authenticateToken, authorizeRoles("student"), readLimiter, trimRequestBodyStrings, getOwnInternships );

// get all internships of a student --admin or divisionIncharge
router.get("/student-internship-by-admin/:studentId", authenticateToken, authorizeRoles("admin", "divisionIncharge"), readLimiter, trimRequestBodyStrings, getStudentInternshipsByAdmin);

//can be used by admin or student or divisionIncharge
router.get("/:internshipId", authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), readLimiter, trimRequestBodyStrings, getSingleInternship);

//update internship --admin or student or divisionIncharge
router.put("/:internshipId" ,
    authenticateToken, 
    authorizeRoles("admin", "student", "divisionIncharge"),
    writeLimiter,
    upload.fields([
        { name: "photoProof" }, 
        { name: "internshipReport" }
    ]),
    trimRequestBodyStrings,
    updateInternship
);


//del internship --admin or student or divisionIncharge
router.delete("/:internshipId" , authenticateToken, authorizeRoles("admin", "student", "divisionIncharge"), writeLimiter, trimRequestBodyStrings, deleteInternship);

module.exports = router;