//this middleware uses memoryStorage for import excel routes, where excelFile is being uploaded to server


const multer = require("multer");

const storage = multer.memoryStorage(); // everything is kept in memory
const upload = multer({ storage });

const uploadMemoryStorage=upload;

module.exports = uploadMemoryStorage;
