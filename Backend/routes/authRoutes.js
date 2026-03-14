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

//forget and reset password routes -> for students
router.post("/forgot-password", passwordResetLimiter, authController.forgotPassword);
router.post("/reset-password/:token", passwordResetLimiter, authController.resetPassword);

//forget and reset password routes -> for admins
router.post("/admin/forgot-password", passwordResetLimiter, authController.adminForgotPassword);
router.post("/admin/reset-password/:token", passwordResetLimiter, authController.adminResetPassword);

//forget and reset password routes -> for division incharge
router.post("/division-incharge/forgot-password", passwordResetLimiter, authController.divisionInchargeForgotPassword);
router.post("/division-incharge/reset-password/:token", passwordResetLimiter, authController.divisionInchargeResetPassword);

module.exports = router;
