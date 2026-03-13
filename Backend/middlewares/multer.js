const multer = require("multer");
const os = require("os");
const path = require("path");
const crypto = require("crypto");

// Allowed MIME types
const allowedMimeTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "application/pdf",
];

// Allowed file extensions (extra safety)
const allowedExtensions = [".png", ".jpg", ".jpeg", ".pdf"];

// Storage config
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, os.tmpdir()); // Safe for Render / Railway
	},

	// -----------------Random filename using crypto---------------------
	// Prevents: File overwrite attacks, Predictable filenames, Security guessing, etc 
	// filename: (req, file, cb) => {
	// 	const uniqueName =
	// 	crypto.randomBytes(16).toString("hex") +
	// 	"-" +
	// 	Date.now() +
	// 	path.extname(file.originalname).toLowerCase();

	// 	cb(null, uniqueName);
	// },

	filename: (req, file, cb) => {

		const originalName = path.basename(file.originalname).toLowerCase()
			.replace(/\s+/g, "_")
			.replace(/[^a-zA-Z0-9._-]/g, "") || "file"; 

		const studentID = req.user?.studentID || "user"; // what if admin uploads? then req.user.studentID will not be availablle

		const uniqueName =
			crypto.randomBytes(8).toString("hex") +
			"-" +
			studentID +
			"-" +
			originalName;

		cb(null, uniqueName);
	}
});

// ----------------MIME + Extension double Validation-------------------
// Prevents: Renamed .exe files, Spoofed content type, etc

const fileFilter = (req, file, cb) => {
	const ext = path.extname(file.originalname).toLowerCase();

	if (!allowedMimeTypes.includes(file.mimetype)) {
		return cb(new Error("Only PNG, JPG, JPEG, or PDF files are allowed depending on the field."));
	}

	if (!allowedExtensions.includes(ext)) {
		return cb(new Error("Invalid file extension"));
	}

	cb(null, true);
};

// Multer instance
const upload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 500 * 1024, // 500 KB
	},
});

module.exports = upload;
