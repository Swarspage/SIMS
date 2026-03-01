const Internship = require("../models/Internship");
const Student = require("../models/Student");
const  {uploadToCloudinary}=require("../helpers/cloudinary/UploadToCloudinary");
const Admin = require("../models/Admin");
const cloudinary = require("../config/cloudinaryConfig");
const {deleteMultipleFromCloudinary} = require("../helpers/cloudinary/DeleteMultipleFromCloudinary");
const {validateAndUploadFiles} = require("../helpers/cloudinary/ValidateAndUploadFiles");
const mongoose=require("mongoose");
const exportToExcel = require('../helpers/excel/exportToExcel');
const { transformInternship, internshipColumnMap } = require('../helpers/excel/exportTransformers');


const { internshipValidationSchema, updateInternshipValidationSchema, getInternshipsValidation } = require("../validators/internshipValidation");

const fileConfigs = [
  {
    fieldName: "internshipReport",
    allowedTypes: ["application/pdf"],
    maxSize: 500 * 1024, // 500KB
    friendlyName: "Internship Report"
  },
  {
    fieldName: "photoProof",
    allowedTypes: ["image/jpeg", "image/jpg", "image/png"],
    maxSize: 500 * 1024, // 500KB
    friendlyName: "Photo Proof"
  }
];


const createInternship = async (req, res) => {

    let uploadedFiles;
    let dbSaved=false; //flag to track if save to Db operations succeeds or fails

    try {

        let stuID;

        if(req.user.role === "student"){
            stuID=req.user.id;
        }else if(req.user.role==="admin" || req.user.role === "divisionIncharge"){
            stuID=req.body.studentId;

            if (!stuID || !mongoose.Types.ObjectId.isValid(stuID)) {
                return res.status(400).json({ success: false, message: "Student ID required in valid format." });
            }

            const student = await Student.findById(stuID);
            if (!student) {
                return res.status(404).json({ success: false, message: "Student not found. Cannot create internship."});
            }

            if(req.user.role === "divisionIncharge"){
                if(student.year !== req.user.year || student.division !== req.user.division){
                    return res.status(403).json({success: false, message: "You can only access students of your division"});
                }
            }
        }

        const { companyName, startDate, endDate, role, durationMonths, isPaid: isPaidRaw, stipend, description } = req.body;

        // Convert strings to proper types
        const parsedDurationMonths = Number(durationMonths);
        const parsedStipend = stipend ? Number(stipend) : undefined;
        const parsedIsPaid = isPaidRaw === "true" || isPaidRaw === true;

        // Validate input using Joi
		const { error } = internshipValidationSchema.validate({ companyName, startDate, endDate, role, durationMonths : parsedDurationMonths, isPaid: parsedIsPaid, stipend : parsedStipend, description }, { abortEarly: false });
		if (error) {
			const validationErrors = error.details.map(err => ({
				field: err.path[0],
				message: err.message
			}));

			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: validationErrors
			});
		}

        // Manual check
        if (parsedIsPaid && (parsedStipend === undefined || parsedStipend === null)) {
            return res.status(400).json({ success: false, message: "Stipend amount required if internship is paid" });
        }

        // Build stipendInfo object
        const stipendInfo = { isPaid: parsedIsPaid };
        if (parsedIsPaid) stipendInfo.stipend = parsedStipend;

        if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).json({ success: false, message: "Photo Proof and Internship Report are required." });
		}


        uploadedFiles = await validateAndUploadFiles(req.files, fileConfigs);
        

        // Create Internship
        const internship = new Internship({
            stuID: stuID,
            companyName,
            startDate,
            endDate,
            role,
            durationMonths : parsedDurationMonths,
            description,
            stipendInfo,
            internshipReport: {
                url:  uploadedFiles.internshipReport.url,
                publicId:  uploadedFiles.internshipReport.publicId
            },
            photoProof: {
                url:  uploadedFiles.photoProof.url,
                publicId:  uploadedFiles.photoProof.publicId
            }
        });

        const saveResult = await internship.save();
        dbSaved=true;   //set flag if DB save is sucessful

        return res.status(201).json({ success: true, internship });

    } catch (err) {
        console.error("Error in createInternship  controller: ", "\ntime = ", new Date().toISOString(), "\nError: ", err);
        
        // if save to DB operation fails, then files stored in cloudinary must be deleted, as files are useless now
        if (!dbSaved && uploadedFiles) {

            //create publicId array
            const publicIds = Object.values(uploadedFiles).map(file => file.publicId);

            await deleteMultipleFromCloudinary(publicIds);
        }

        return res.status(500).json({ success: false, message: err.message || "Some Error Occured. Please Try Again Later." });
    }
};


const getInternships = async (req, res) => {
    try {
        const { year, division, search, page, limit, isPaid } = req.query;
        const isExport = req.query.export === 'true';

        const { error, value } = getInternshipsValidation.validate(
            { year, search, page, limit, isPaid },
            { abortEarly: false }
        );
        if (error) {
            const validationErrors = error.details.map(err => ({
                field: err.path[0],
                message: err.message
            }));
            return res.status(400).json({ success: false, message: "Validation failed", errors: validationErrors });
        }

        if (req.user.role === "divisionIncharge") {
            if ((year && year !== req.user.year) || (division && division !== req.user.division)) {
                return res.status(403).json({ success: false, message: "You can only access students of your division." });
            }
        }

        const pageNum = value.page || 1;
        const limitNum = Math.min(value.limit || 10, 20);
        const skip = (pageNum - 1) * limitNum;

        // Shared pipeline
        const pipeline = [];

        pipeline.push({
            $lookup: {
                from: "students",
                localField: "stuID",
                foreignField: "_id",
                as: "student"
            }
        });

        pipeline.push({
            $unwind: {
                path: "$student",
                preserveNullAndEmptyArrays: true
            }
        });

        const match = {};

        if (req.user.role === "divisionIncharge") {
            match["student.year"] = req.user.year;
            match["student.division"] = req.user.division;
        } else if (req.user.role === "admin") {
            if (year) match["student.year"] = year.trim();
            if (division) match["student.division"] = division.trim();
        } else {
            return res.status(403).json({ success: false, message: "Unauthorized role." });
        }

        if (search) {
            const safeSearch = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            match.$or = [
                { companyName: { $regex: safeSearch, $options: "i" } },
                { role: { $regex: safeSearch, $options: "i" } },
                { description: { $regex: safeSearch, $options: "i" } },
                { "student.name.firstName": { $regex: safeSearch, $options: "i" } },
                { "student.name.middleName": { $regex: safeSearch, $options: "i" } },
                { "student.name.lastName": { $regex: safeSearch, $options: "i" } },
            ];
        }

        if (isPaid === "true") match["stipendInfo.isPaid"] = true;
        else if (isPaid === "false") match["stipendInfo.isPaid"] = false;

        if (Object.keys(match).length) pipeline.push({ $match: match });

        // Shared $project — includes everything both branches need
        const exportFields = {
            companyName:      1,
            role:             1,
            startDate:        1,
            endDate:          1,
            durationMonths:   1,
            stipendInfo:      1,
            description:      1,
            internshipReport: 1,
            photoProof:       1,
            // Student fields — all of them
            stuID:            "$student._id",
            studentID:        "$student.studentID",
            PRN:              "$student.PRN",
            studentName:      "$student.name",
            studentYear:      "$student.year",
            studentDivision:  "$student.division",
            studentBranch:    "$student.branch",
            studentDob:       "$student.dob",
            studentBloodGroup:"$student.bloodGroup",
            studentCategory:  "$student.category",
            studentAbcId:     "$student.abcId",
            studentMobileNo:  "$student.mobileNo",
            studentParentMobileNo: "$student.parentMobileNo",
            studentEmail:     "$student.email",
            studentParentEmail: "$student.parentEmail",
            studentCurrentAddress: "$student.currentAddress",
            studentNativeAddress:  "$student.nativeAddress",
        };

        const leanFields = {
            companyName:      1,
            role:             1,
            startDate:        1,
            endDate:          1,
            durationMonths:   1,
            stipendInfo:      1,
            description:      1,
            internshipReport: 1,
            photoProof:       1,
            // Student fields — all of them
            stuID:            "$student._id",
            studentID:        "$student.studentID",
            studentName:      "$student.name",
            studentYear:      "$student.year",
            studentDivision:  "$student.division",
            studentBranch:    "$student.branch",
            studentMobileNo:  "$student.mobileNo",
            studentEmail:     "$student.email",
            
        };

        // Export branch
        if (isExport) {
            const internships = await Internship.aggregate([
                ...pipeline,
                { $sort: { createdAt: -1 } },
                { $project: exportFields },
            ]);
            

            const rows = internships.map(transformInternship);
            const buffer = await exportToExcel(rows, 'Internships', internshipColumnMap);

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename="internships.xlsx"');
            return res.send(buffer);
        }

        // Paginated branch 
        const results = await Internship.aggregate([
            ...pipeline,
            {
                $facet: {
                    data: [
                        { $sort: { createdAt: -1 } },
                        { $skip: skip },
                        { $limit: limitNum },
                        { $project: leanFields }
                    ],
                    totalCount: [{ $count: "total" }]
                }
            }
        ]);

        const internships = results[0]?.data || [];
        const total = results[0]?.totalCount[0]?.total || 0;

        return res.json({
            success: true,
            data: internships,
            total,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum),
        });

    } catch (err) {
        console.error("Error in getInternships controller: ", "\ntime = ", new Date().toISOString(), "\nError: ", err);
        return res.status(500).json({ success: false, message: err.message || "Some Error Occurred. Please Try Again Later." });
    }
};



// GET INTERNSHIPS (with optional pagination, search, year filter, and paid/unpaid filter) --admin or division incharge
const getInternships2 = async (req, res) => {
    try {

        // Get query params
        const { year, division, search, page, limit, isPaid } = req.query;

        // Validate input
        const { error, value } = getInternshipsValidation.validate(
        { year, search, page, limit, isPaid },
        { abortEarly: false }
        );
        if (error) {
        const validationErrors = error.details.map(err => ({
            field: err.path[0],
            message: err.message
        }));
        return res.status(400).json({ success: false, message: "Validation failed", errors: validationErrors });
        }

        if(req.user.role === "divisionIncharge"){
            if((year && year !== req.user.year) || (division &&  division !== req.user.division) ){
                return res.status(403).json({ success: false, message: "You can only access students  of your division."});
            }
        }

        const pageNum = value.page || 1;
        const limitNum = Math.min(value.limit || 10, 20);
        const skip = (pageNum - 1) * limitNum;

        // Build aggregation pipeline
        const pipeline = [];

        // Lookup student details
        pipeline.push({
        $lookup: {
            from: "students",
            localField: "stuID",
            foreignField: "_id",
            as: "student"
        }
        });

        // Unwind student array
        pipeline.push({ $unwind: {
            path: "$student",
            preserveNullAndEmptyArrays: true
        } });

        // Build match conditions
        const match = {};

        // Division Incharge filter
        if (req.user.role === "divisionIncharge") {
            match["student.year"] = req.user.year;
            match["student.division"] = req.user.division;
        }else if(req.user.role === "admin"){
            if (year) {
                match["student.year"] = year.trim();
            }

            if (division) {
                match["student.division"] = division.trim();
            }

        }else{
            return res.status(403).json({ success: false, message: "Unautorized role.", });
        }

        

        if (search) {
            const safeSearch = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            match.$or = [
                { companyName: { $regex: safeSearch, $options: "i" } },
                { role: { $regex: safeSearch, $options: "i" } },
                { description: { $regex: safeSearch, $options: "i" } },
                { "student.name.firstName": { $regex: safeSearch, $options: "i" } },
                { "student.name.middleName": { $regex: safeSearch, $options: "i" } },
                { "student.name.lastName": { $regex: safeSearch, $options: "i" } },
            ];
        }

        // Filter by paid/unpaid
        if (isPaid === "true") match["stipendInfo.isPaid"] = true;
        else if (isPaid === "false") match["stipendInfo.isPaid"] = false;

        if (Object.keys(match).length) {
        pipeline.push({ $match: match });
        }

        // Use $facet for pagination + total count in one query
        const results = await Internship.aggregate([
        ...pipeline,
        {
            $facet: {
            data: [
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limitNum },
                {
                $project: {
                    companyName: 1,
                    role: 1,
                    startDate: 1,
                    endDate: 1,
                    durationMonths: 1,
                    stipendInfo: 1,
                    description: 1,
                    internshipReport: 1,
                    photoProof: 1,
                    stuID: "$student._id",
                    studentName: "$student.name",
                    studentYear: "$student.year"
                }
                }
            ],
            totalCount: [{ $count: "total" }]
            }
        }
        ]);

        const internships = results[0]?.data || [];
        const total = results[0]?.totalCount[0]?.total || 0;

        return res.json({ 
            success: true,
            data: internships,
            total,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum),
        });

    } catch (err) {
        console.error("Error in getInternships controller: ", "\ntime = ", new Date().toISOString(), "\nError: ", err);
        return res.status(500).json({ success: false, message: err.message || "Some Error Occured. Please Try Again Later." });
    }
};


// Get internships by studentId --for student
const getOwnInternships = async (req, res) => {

    try {
        const studentId = req.user.id; // always the logged-in student

        const internships = await Internship.find({ stuID: studentId }).sort({ startDate: -1 });

        return res.status(200).json({ success: true, data: internships });
    } catch (err) {
        console.error("Error in getOwnInternships controller: ", "\ntime = ", new Date().toISOString(), "\nError: ", err);
        return res.status(500).json({ success: false, message: err.message || "Some Error Occured. Please Try Again Later." });
    }
};


//GET internships by studentId -- for admin
//tailor this for division incharge too
//use case:- admin clicks on student -> clicks on internships -> then internships are shown
// controllers/adminInternshipController.js
const getStudentInternshipsByAdmin = async (req, res) => {
    try {

        const { studentId } = req.params;

        if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({ success: false, message: "Student ID is required in valid format." });
        }

        if(req.user.role === "divisionIncharge"){

            const student = await Student.findById(studentId).select("year division");
            if (!student) {
                return res.status(404).json({ success: false, message: "Student not found" });
            }


            if(student.year !== req.user.year || student.division !== req.user.division){
                return res.status(403).json({success: false, message: "You can only access students of your division"});
            }
           
        }

        const internships = await Internship.find({ stuID: studentId })
            .populate({
                path: "stuID",
                select: "name branch year division"  // only these fields
            })
            .sort({ startDate: -1 });

        return res.status(200).json({ success: true, data: internships });
    } catch (err) {
        console.error("Error in getInternships controller: ", "\ntime = ", new Date().toISOString(), "\nError: ", err);
        return res.status(500).json({ success: false, message: err.message || "Some Error Occured. Please Try Again Later." });
    }
};


// GET single internship details by internshipId --for admin, student, divisionIncharge
//use case for student:- when student clicks on a single internship to  view details or update it( before upddating, details are required)
//use case for admin:- in all internshipd, admin clicks on single internship to get its details
const getSingleInternship = async (req, res) => {
    try {
        const { internshipId } = req.params;

        if (!internshipId) {
            return res.status(400).json({ success: false, message: "Internship ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(internshipId)) {
            return res.status(400).json({ success: false, message: "Invalid internship ID format"});
        }


        let query = Internship.findById(internshipId);
        if (req.user.role !== "student") {
            query = query.populate("stuID", "year division");
        }

        const internship = await query; // execute once
        if (!internship) {
            return res.status(404).json({ success: false, message: "Internship not found" });
        }

        if (req.user.role === "student") {
            if (internship.stuID.toString() !== req.user.id.toString()) {
                return res.status(403).json({ success: false, message: "Resource does not belong to logged in student." });
            }
        } else if (req.user.role === "divisionIncharge") {
            if (internship.stuID.year !== req.user.year || internship.stuID.division !== req.user.division) {
                return res.status(403).json({ success: false, message: "You can only access students in your division." });
            }
        } else if (req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Wrong Role." });
        }

        return res.status(200).json({ success: true, data: internship });
    } catch (err) {
        console.error("Error in getSingleInternship controller: ", "\ntime = ", new Date().toISOString(), "\nError: ", err);
        return res.status(500).json({ success: false, message: err.message || "Some Error Occured. Please Try Again Later." });
    }
};


// Update Internship
const updateInternship = async (req, res) => {

    let dbSaved = false;

    // Track newly uploaded public IDs (for cleanup if DB fails)
    let newPublicIds = [];

    try {

        const { internshipId } = req.params;

        if (!internshipId) {
            return res.status(400).json({ success: false, message: "Internship ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(internshipId)) {
            return res.status(400).json({ success: false, message: "Invalid internship ID format" });
        }

        let query = Internship.findById(internshipId);
        if (req.user.role !== "student") {
            query = query.populate("stuID", "year division");
        }

        const existingInternship = await query; // execute once
        if (!existingInternship) {
            return res.status(404).json({ success: false, message: "Internship not found" });
        }

        if (req.user.role === "student") {
            if (existingInternship.stuID.toString() !== req.user.id.toString()) {
                return res.status(403).json({ success: false, message: "Resource does not belong to logged in student." });
            }
        } else if (req.user.role === "divisionIncharge") {
            if (existingInternship.stuID.year !== req.user.year || existingInternship.stuID.division !== req.user.division) {
                return res.status(403).json({ success: false, message: "You can only access students in your division." });
            }
        } else if (req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Wrong Role." });
        }

        const { companyName, startDate, endDate, role, durationMonths, isPaid: isPaidRaw, stipend, description } = req.body;

        const parsedDurationMonths = durationMonths !== undefined ? Number(durationMonths) : undefined;
        const parsedStipend = stipend !== undefined ? Number(stipend) : undefined;
        const parsedIsPaid = isPaidRaw !== undefined ? (isPaidRaw === "true" || isPaidRaw === true) : undefined;


        const { error , value:updatedData } = updateInternshipValidationSchema.validate(
            { companyName, startDate, endDate, role, durationMonths: parsedDurationMonths, isPaid: parsedIsPaid, stipend: parsedStipend, description },
            { abortEarly: false }
        );

        if (error) {
            const validationErrors = error.details.map(err => ({
                field: err.path[0],
                message: err.message
            }));

            return res.status(400).json({ success: false, message: "Validation failed", errors: validationErrors });
        }

        if (parsedIsPaid && (parsedStipend === undefined || parsedStipend === null)) {
            return res.status(400).json({ success: false, message: "Stipend amount required if internship is paid" });
        }

        if (parsedIsPaid !== undefined) {
            updatedData.stipendInfo = {
                isPaid: parsedIsPaid,
                ...(parsedIsPaid && { stipend: parsedStipend })
            };

            // Remove flat fields so they don't go to DB
            delete updatedData.isPaid;
            delete updatedData.stipend;
        }

        /* FILE HANDLING LOGIC */

        const filteredFiles = {};

        if (req.files?.internshipReport?.length > 0) {
            filteredFiles.internshipReport = req.files.internshipReport;
        }

        if (req.files?.photoProof?.length > 0) {
            filteredFiles.photoProof = req.files.photoProof;
        }

        const activeConfigs = fileConfigs.filter(cfg => filteredFiles[cfg.fieldName]);

        let uploadedFiles = {};

        if (Object.keys(filteredFiles).length > 0) {
            uploadedFiles = await validateAndUploadFiles(filteredFiles, activeConfigs);
        }

        /* DELETE OLD FILES + ADD NEW */

        if (uploadedFiles.internshipReport) {

            const oldPublicId = existingInternship.internshipReport?.publicId;
            if (oldPublicId) {
                await cloudinary.uploader.destroy(oldPublicId).catch(() => {});
            }

            updatedData.internshipReport = {
                url: uploadedFiles.internshipReport.url,
                publicId: uploadedFiles.internshipReport.publicId
            };

            newPublicIds.push(uploadedFiles.internshipReport.publicId);
        }

        if (uploadedFiles.photoProof) {

            const oldPublicId = existingInternship.photoProof?.publicId;
            if (oldPublicId) {
                await cloudinary.uploader.destroy(oldPublicId).catch(() => {});
            }

            updatedData.photoProof = {
                url: uploadedFiles.photoProof.url,
                publicId: uploadedFiles.photoProof.publicId
            };

            newPublicIds.push(uploadedFiles.photoProof.publicId);
        }

        if (
            Object.keys(updatedData).length === 0 &&
            Object.keys(uploadedFiles).length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "No data provided to update"
            });
        }

        /* DB UPDATE */

        const updatedInternship = await Internship.findByIdAndUpdate(
            internshipId,
            { $set: updatedData },
            { new: true, runValidators: true }
        );

        dbSaved = true;

        return res.status(200).json({ success: true, message: "Internship updated successfully", data: updatedInternship });

    } catch (err) {
        console.error("Error in updateInternship controller: ",  "\ntime = ", new Date().toISOString(), "\nError: ", err );

        if (!dbSaved && newPublicIds.length > 0) {
            await deleteMultipleFromCloudinary(newPublicIds);
        }

        return res.status(500).json({ success: false, message: err.message || "Some Error Occured. Please Try Again Later." });
    }
};


// DELETE a specific internship --make ti atomic lateron
const deleteInternship = async (req, res) => {
    try {

        const { internshipId } = req.params;

        if(!internshipId){
            return res.status(400).json({ success: false, message: "internship ID required"});
        }

        if (!mongoose.Types.ObjectId.isValid(internshipId)) {
            return res.status(400).json({ success: false, message: "Invalid internship ID format"});
        }

        let query = Internship.findById(internshipId);
        if (req.user.role !== "student") {
            query = query.populate("stuID", "year division");
        }

        const internship = await query; // execute once
        if (!internship) {
            return res.status(404).json({ success: false, message: "Internship not found" });
        }

        if (req.user.role === "student") {
            if (internship.stuID.toString() !== req.user.id.toString()) {
                return res.status(403).json({ success: false, message: "Resource does not belong to logged in student." });
            }
        } else if (req.user.role === "divisionIncharge") {
            if (internship.stuID.year !== req.user.year || internship.stuID.division !== req.user.division) {
                return res.status(403).json({ success: false, message: "You can only access students in your division." });
            }
        } else if (req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Wrong Role." });
        }



        // Delete files from Cloudinary if public_id exists
        const publicIdsToDelete = [];

            if (internship.internshipReport?.publicId) {
                publicIdsToDelete.push(internship.internshipReport.publicId);
            }
            if (internship.photoProof?.publicId) {
                publicIdsToDelete.push(internship.photoProof.publicId);
            }

            // 4. Delete internship from DB
            await Internship.findByIdAndDelete(internshipId);

            // 5. Delete files from Cloudinary (helper handles errors internally)
            try{
                await deleteMultipleFromCloudinary(publicIdsToDelete);
            }catch(err){
                console.error(err);
            }

            
        return res.status(200).json({ success: true, message: "Internship deleted successfully" });

    } catch (err) {
        console.error("Error in deleteInternship controller: ", "\ntime = ", new Date().toISOString(), "\nError: ", err);
        return res.status(500).json({ success: false, message: err.message || "Some Error Occured. Please Try Again Later." });
    }
};


module.exports = { createInternship, getInternships , getOwnInternships , getStudentInternshipsByAdmin , getSingleInternship , updateInternship , deleteInternship };