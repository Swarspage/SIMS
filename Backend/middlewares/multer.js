//this middleware handles file uploads(mostly cloudinary) to our server from client side or postman etc
const multer= require("multer");

const storage= multer.diskStorage({
    filename: function (req,file,cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
});


const upload = multer({storage:storage});


module.exports = upload;