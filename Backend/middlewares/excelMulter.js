//this middleware uses diskStorage for import excel routes, where excelFile is being uploaded to server

// THIS middleware is NOT IN USE anymore --because for deployed servers, we should not use diskStorage
const multer = require("multer");
const path = require("path");

// Define storage location for Excel files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store Excel files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Allow only Excel files
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only Excel files are allowed!"), false);
  }
};

// Create upload middleware
const uploadExcel = multer({ storage, fileFilter });

module.exports = uploadExcel;
