//this middleware handles file uploads(mostly cloudinary) to our server from client side or postman etc
// const multer= require("multer");

// const storage= multer.diskStorage({
//     filename: function (req,file,cb){
//         cb(null, Date.now() + "-" + file.originalname)
//     }
// });


// const upload = multer({storage:storage});


// module.exports = upload;


// made this middleware beter fit for deploying  on render and railway
const multer = require("multer");
const os = require("os");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir());
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
