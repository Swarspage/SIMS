const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const upload = require("../middlewares/multer");

//student auth routes
router.post('/signup' , authController.signup);     
router.post('/login', authController.login);

//admin auth routes
router.post('/admin-login', authController.adminLogin);

//division incharge auth routes
router.post('/division-incharge', authController.divisionInchargeLogin);

//logout route
router.get('/logout', authController.logout);

//forget and reset password routes
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
