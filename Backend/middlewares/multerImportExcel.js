//this middleware uses memoryStorage for import excel routes, where excelFile is being uploaded to server

const multer = require("multer");

const storage = multer.memoryStorage(); // everything is kept in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});


const uploadMemoryStorage=upload;

module.exports = uploadMemoryStorage;
