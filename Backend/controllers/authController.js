const bcrypt = require('bcryptjs');
const crypto = require("crypto");   // For generating random tokens for password reset
//mailservice -> going to use brevo instead of nodemailer
// const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const DivisionIncharge = require("../models/DivisionIncharge");
const Student = require("../models/Student.js")
const Admin = require('../models/Admin.js');
const sendEmailBrevo = require("../services/sendEmailBrevo");
const { signupSchema, loginSchema, adminLoginSchema, divisionInchargeLoginSchema , forgotPasswordSchema , resetPasswordSchema , adminResetPasswordSchema , divisionInchargeResetPasswordSchema } = require('../validators/authValidation.js');


// const { uploadToCloudinary } = require("../helpers/cloudinary/UploadToCloudinary.js");


const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

const cookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24, // 1 day
  secure: true,
  sameSite: "none",
};
 
//signup2
exports.signup = async (req, res) => {
  try {

    const { error, value } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { studentID, email, password } = value;

    // Check student exists (added by admin) also email(added by admin)
    const student = await Student.findOne({ studentID , email });

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student ID and Email. Contact admin."
      });
    }

    // Already registered
    if (student.password) {
      return res.status(400).json({
        success: false,
        message: "Student already registered. Please login."
      });
    }

    // Email already exists
    // const existingEmail = await Student.findOne({ email });
    // if (existingEmail) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Email already in use."
    //   });
    // }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update existing record
    student.email = email;
    student.password = hashedPassword;
    // student.isRegistered = true;

    await student.save();

    return res.status(200).json({
      success: true,
      message: "Signup successful. Please login."
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

//login2
// POST /student/login
exports.login = async (req, res) => {
  try {

    // console.log("Request Body:", req.body);

    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { studentID, password } = value;

    const student = await Student.findOne({ studentID });

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student ID"
      });
    }

    if (!student.password) {
      return res.status(400).json({
        success: false,
        message: "Please complete signup first"
      });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password"
      });
    }

    // Generate Token
    const token = jwt.sign(
      {
        id: student._id,
        role: "student",
        studentID: student.studentID
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Save token in cookie
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: student._id,
        studentID: student.studentID,
        email: student.email,
        role: "student"
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

// ADMIN LOGIN
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Joi validation
    const { value, error } = adminLoginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map(err => ({
          field: err.path[0],
          message: err.message
      }));

      return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validationErrors
      });
    }


    const admin = await Admin.findOne({ email : value.email });
    if (!admin) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const match = await bcrypt.compare(value.password, admin.password);
    if (!match) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const adminObj = admin.toObject();
    delete adminObj.password;


    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, cookieOptions);
    return res.status(200).json({
      success: true, message: 'Admin login successful', token: token, // ← ADDED THIS
      user: {
        id: admin._id,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error. Please try again later." });
  }
};


//division incharge login
exports.divisionInchargeLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Joi Validation
    const { value, error } = divisionInchargeLoginSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }


    // Find User
    const divisionIncharge = await DivisionIncharge.findOne({ email : value.email });
    if (!divisionIncharge) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Password Check
    const match = await bcrypt.compare(value.password, divisionIncharge.password);
    if (!match) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // JWT Token
    const token = jwt.sign(
      { id: divisionIncharge._id, email: divisionIncharge.email, role: 'divisionIncharge', division: divisionIncharge.division, year: divisionIncharge.year },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, cookieOptions);

    // Response
    return res.status(200).json({
      success: true,
      message: 'Division Incharge login successful',
      token,
      user: {
        id: divisionIncharge._id,
        email: divisionIncharge.email,
        role: 'divisionIncharge',
        division: divisionIncharge.division,
        year: divisionIncharge.year
      }
    });

  } catch (error) {
    console.error("Division Incharge Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later."
    });
  }
};


// LOGOUT
exports.logout = (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, sameSite: "none", secure: true });
    return res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error. Please try again later." });
  }
};


// FORGOT PASSWORD -> new auth -> student
exports.forgotPassword = async (req, res) => {
  try {
    const { error , value } = forgotPasswordSchema.validate(req.body);

    if(error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }
    const { email } = value;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email"
      });
    }

    // Generate random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save to DB
    student.resetPasswordToken = hashedToken;
    student.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    await student.save();

    // Create reset URL
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Email setup
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASSWORD
    //   }
    // });

    const htmlContent = `
    <h2>Hello ${student.name?.firstName || "Student"},</h2>
    <p>You requested a password reset.</p>
    <p><a href="${resetURL}">Click here to reset your password</a></p>
    <p>This link expires in 15 minutes.</p>
  `;

    await sendEmailBrevo({
      toEmail: student.email,
      subject: "Password Reset Request",
      htmlContent: htmlContent
    }); 

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email"
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};



// RESET PASSWORD -> new auth -> student
exports.resetPassword = async (req, res) => {
  try {

    const { error , value } = resetPasswordSchema.validate(req.body);

    if(error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }
    const { token } = req.params;
    const { newPassword } = value;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password is required"
      });
    }
    // if (!token) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Token is missing"
    //   });
    // }

    // Hash incoming token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find student
    const student = await Student.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    student.password = hashedPassword;
    student.resetPasswordToken = undefined;
    student.resetPasswordExpire = undefined;

    await student.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};


//admin-forgot pass
exports.adminForgotPassword = async (req, res) => {
  try {
    const { error, value } = forgotPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const admin = await Admin.findOne({ email: value.email });
    if (!admin) {
      // Don't reveal whether admin exists — generic message
      return res.status(200).json({ success: true, message: "If that email exists, a reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    admin.resetPasswordToken = hashedToken;
    admin.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await admin.save();

    const resetURL = `${process.env.FRONTEND_URL}/admin/reset-password/${resetToken}`;

    const htmlContent = `
      <h2>Hello Admin,</h2>
      <p>You are requested to reset your password.</p>
      <p><a href="${resetURL}">Click here to reset your password</a></p>
      <p>This link expires in 15 minutes.</p>
    `;

    await sendEmailBrevo({
      toEmail: admin.email,
      subject: "Admin Password Reset Request",
      htmlContent,
    });

    return res.status(200).json({ success: true, message: "If that email exists, a reset link has been sent." });

  } catch (error) {
    console.error("Admin Forgot Password Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


//admin-reset pass
exports.adminResetPassword = async (req, res) => {
  try {
    const { error, value } = adminResetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { token } = req.params;
    const { newPassword } = value;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;
    await admin.save();

    return res.status(200).json({ success: true, message: "Admin password reset successful" });

  } catch (error) {
    console.error("Admin Reset Password Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//division incharge -> forgot-pass
exports.divisionInchargeForgotPassword = async (req, res) => {
  try {
    const { error, value } = forgotPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
 
    const divisionIncharge = await DivisionIncharge.findOne({ email: value.email });
    if (!divisionIncharge) {
      // Don't reveal whether division incharge exists — generic message
      return res.status(200).json({ success: true, message: "If that email exists, a reset link has been sent." });
    }
 
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
 
    divisionIncharge.resetPasswordToken = hashedToken;
    divisionIncharge.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await divisionIncharge.save();
 
    const resetURL = `${process.env.FRONTEND_URL}/division-incharge/reset-password/${resetToken}`;
 
    const htmlContent = `
      <h2>Hello ${divisionIncharge.name || "Division Incharge"},</h2>
      <p>You are requested to reset your password.</p>
      <p><a href="${resetURL}">Click here to reset your password</a></p>
      <p>This link expires in 15 minutes.</p>
    `;
 
    await sendEmailBrevo({
      toEmail: divisionIncharge.email,
      subject: "Division Incharge Password Reset Request",
      htmlContent,
    });
 
    return res.status(200).json({ success: true, message: "If that email exists, a reset link has been sent." });
 
  } catch (error) {
    console.error("Division Incharge Forgot Password Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
 
 
//division incharge -> reset pass
exports.divisionInchargeResetPassword = async (req, res) => {
  try {
    const { error, value } = divisionInchargeResetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
 
    const { token } = req.params;
    const { newPassword } = value;
 
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
 
    const divisionIncharge = await DivisionIncharge.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
 
    if (!divisionIncharge) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
 
    divisionIncharge.password = await bcrypt.hash(newPassword, 10);
    divisionIncharge.resetPasswordToken = undefined;
    divisionIncharge.resetPasswordExpire = undefined;
    await divisionIncharge.save();
 
    return res.status(200).json({ success: true, message: "Division Incharge password reset successful" });
 
  } catch (error) {
    console.error("Division Incharge Reset Password Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

