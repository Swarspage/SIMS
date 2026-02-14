//this middleware uses memoryStorage for import excel routes, where excelFile is being uploaded to server

const multer = require("multer");
const path = require("path");

// Allowed Excel MIME types
const allowedMimeTypes = [
	"application/vnd.ms-excel", // .xls
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
];

// Allowed extensions
const allowedExtensions = [".xls", ".xlsx"];

// Memory storage (for processing directly)
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
	const ext = path.extname(file.originalname).toLowerCase();

	if (!allowedExtensions.includes(ext)) {
		return cb(new Error("Only .xls and .xlsx files are allowed"));
	}

	if (
		!allowedMimeTypes.includes(file.mimetype) &&
		file.mimetype !== "application/octet-stream"
	) {
		return cb(new Error("Invalid Excel file type"));
	}

	cb(null, true);
};

const uploadMemoryStorage = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 1 * 1024 * 1024, // 1MB
      files: 1, // only one Excel file
    },
});

module.exports = uploadMemoryStorage;

