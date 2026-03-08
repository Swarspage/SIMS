const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authLimiter, passwordResetLimiter } = require('../middlewares/rateLimiter/authLimiter');
// const upload = require("../middlewares/multer");

//student auth routes
router.post('/signup' ,authLimiter , authController.signup);     
router.post('/login', authLimiter , authController.login);

//admin auth routes
router.post('/admin-login', authLimiter , authController.adminLogin);

//division incharge auth routes
router.post('/division-incharge', authLimiter , authController.divisionInchargeLogin);

//logout route
router.get('/logout', authController.logout);

//forget and reset password routes
router.post("/forgot-password", passwordResetLimiter, authController.forgotPassword);
router.post("/reset-password/:token", passwordResetLimiter, authController.resetPassword);

module.exports = router;
