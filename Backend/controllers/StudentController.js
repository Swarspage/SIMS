require("dotenv").config();
const Student = require("../models/Student");
const Admin = require("../models/Admin");
const cloudinary = require("../config/cloudinaryConfig");
const { uploadToCloudinary } = require("../helpers/UploadToCloudinary");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const {
  importExcelSchema,
  addStudentDetailsSchema,
  updateStudentSchema,
  getStudentsValidation,
} = require("../validators/studentValidation");

const cascadeDeleteStudent = require("../helpers/cascadeDeleteStudent");

// ✅ HARDCODED EMAIL - This WILL work
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

console.log("✅ Email transporter initialized");

// Generate random password
const generateRandomPassword = (length = 14) => {
  return crypto.randomBytes(length).toString("base64").slice(0, length);
};

// ==================== IMPORT EXCEL WITH PASSWORDS ====================
const importExcelDataWithPasswords = async (req, res) => {
  try {
    const adminId = req.user.id;

    const adminExists = await Admin.findById(adminId);
    if (!adminExists) {
      return res
        .status(403)
        .json({ success: false, message: "Admin not found or unauthorized" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rawData = xlsx.utils.sheet_to_json(sheet);

    if (rawData.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Excel file is empty" });
    }

    const filteredData = rawData
      .map((row) => ({
        studentID: row.studentID || row.StudentID || row["Student ID"] || "",
        email: row.email || row.Email || row["Email ID"] || "",
      }))
      .filter((item) => item.studentID && item.email);

    if (filteredData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid studentID or email fields found in Excel file",
      });
    }

    let successCount = 0;
    let failedStudents = [];
    let createdStudents = [];

    for (const data of filteredData) {
      try {
        const randomPassword = generateRandomPassword(14);
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const { error, value } = importExcelSchema.validate(data, {
          abortEarly: false,
        });
        if (error) {
          const validationErrors = error.details.map((err) => ({
            field: err.path[0],
            message: err.message,
          }));

          failedStudents.push({
            studentID: data.studentID,
            email: data.email,
            error: validationErrors,
          });
          continue;
        }

        const newStudent = new Student({
          studentID: data.studentID.trim(),
          email: data.email.trim(),
          password: hashedPassword,
        });

        const savedStudent = await newStudent.save();

        createdStudents.push({
          studentID: data.studentID,
          email: data.email,
          password: randomPassword,
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: data.email,
          subject: "Your Account Password",
          text: `Hello ${data.studentID},\n\nYour new password is: ${randomPassword}\n\nUse your Student ID and this password to login.\n\nBest regards,\nDatta Meghe College Of Engineering`,
        };

        await transporter.sendMail(mailOptions);
        successCount++;
      } catch (err) {
        console.error(`❌ Failed for ${data.studentID}:`, err.message);
        failedStudents.push({
          studentID: data.studentID,
          email: data.email,
          error: err.message,
        });
      }
    }

    if (createdStudents.length > 0) {
      console.log("📧 ========== ADMIN EMAIL DEBUG ==========");
      console.log("EMAIL_USER:", process.env.EMAIL_USER);
      console.log(
        "EMAIL_PASSWORD:",
        process.env.EMAIL_PASSWORD ? "✓ Set" : "✗ Missing"
      );
      console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
      console.log("Created Students Count:", createdStudents.length);

      const studentListHTML = createdStudents
        .map(
          (s) =>
            `<tr><td>${s.studentID}</td><td>${s.email}</td><td>${s.password}</td></tr>`
        )
        .join("");

      const adminEmailBody = `
        <h2>Student Import Summary Report</h2>
        <p><strong>Total Students Imported:</strong> ${successCount}</p>
        <p><strong>Failed:</strong> ${failedStudents.length}</p>
        <br/>
        <table border="1" cellpadding="10" cellspacing="0">
          <thead>
            <tr style="background-color: #2563eb; color: white;">
              <th>Student ID</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            ${studentListHTML}
          </tbody>
        </table>
        <br/>
        ${
          failedStudents.length > 0
            ? `<h3>Failed Students:</h3><pre>${JSON.stringify(
                failedStudents,
                null,
                2
              )}</pre>`
            : ""
        }
        <br/>
        <p>This is an automated email from Datta Meghe College System.</p>
      `;

      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `Student Import Report - ${successCount} Students Added`,
        html: adminEmailBody,
      };

      console.log("📧 Mail Options:", {
        from: adminMailOptions.from,
        to: adminMailOptions.to,
        subject: adminMailOptions.subject,
      });

      try {
        console.log("📨 Sending email with transporter...");
        const result = await transporter.sendMail(adminMailOptions);
        console.log("✅ Admin notification email sent!");
        console.log("Email Result:", result.response);
      } catch (adminEmailErr) {
        console.error("⚠️ ADMIN EMAIL FAILED!");
        console.error("Error Message:", adminEmailErr.message);
        console.error("Error Code:", adminEmailErr.code);
        console.error("Full Error:", adminEmailErr);
      }
    }

    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: `Process completed. ${successCount} students added and emailed successfully. Admin notification sent.`,
      failed: failedStudents,
      created: successCount,
    });
  } catch (error) {
    console.error("Error importing Excel:", error);
    res.status(500).json({
      success: false,
      message: "Error importing Excel data",
    });
  }
};

// ==================== EXPORT STUDENTS TO EXCEL ====================
const exportAllStudentsToExcel = async (req, res) => {
  try {
    const students = await Student.find();

    if (!students || students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found in the database.",
      });
    }

    const formattedData = students.map((student) => ({
      StudentID: student.studentID || "",
      Name:
        (student.name?.firstName || "") +
          " " +
          (student.name?.middleName || "") +
          " " +
          (student.name?.lastName || "") || "",
      Email: student.email || "",
      Branch: student.branch || "",
      Year: student.year || "",
      DOB: student.dob || "",
      BloodGroup: student.bloodGroup || "",
      MobileNo: student.mobileNo || "",
      CurrentStreet: student.currentAddress?.street || "",
      CurrentCity: student.currentAddress?.city || "",
      CurrentPincode: student.currentAddress?.pincode || "",
    }));

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(formattedData);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Students");

    const exportDir = path.join(__dirname, "../exports");
    if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

    const filePath = path.join(exportDir, `Students_${Date.now()}.xlsx`);
    xlsx.writeFile(workbook, filePath);

    res.download(filePath, "StudentsData.xlsx", (err) => {
      if (err) {
        console.error("Error while downloading file:", err);
      }
      fs.unlink(filePath, (delErr) => {
        if (delErr) console.error("Error deleting temp file:", delErr);
      });
    });
  } catch (error) {
    console.error("Error exporting students to Excel:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while exporting data.",
    });
  }
};

// ==================== ADD STUDENT DETAILS ====================
const addStudentDetails = async (req, res) => {
  let dbSaved = false;
  let uploadResult = null;

  try {
    const studentId = req.user.id;

    const student = await Student.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const {
      firstName,
      middleName,
      lastName,
      motherName,
      PRN,
      branch,
      year,
      dob,
      bloodGroup,
      currentStreet,
      currentCity,
      pincode,
      nativeStreet,
      nativeCity,
      nativePincode,
      category,
      mobileNo,
      parentMobileNo,
    } = req.body;

    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !motherName ||
      !PRN ||
      !branch ||
      !year ||
      !dob ||
      !bloodGroup ||
      !currentStreet ||
      !currentCity ||
      !pincode ||
      !nativeStreet ||
      !nativeCity ||
      !nativePincode ||
      !category ||
      !mobileNo ||
      !parentMobileNo
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Student Photo required" });
    }

    const { error, value } = addStudentDetailsSchema.validate(
      {
        firstName,
        middleName,
        lastName,
        motherName,
        PRN,
        branch,
        year,
        dob,
        bloodGroup,
        currentStreet,
        currentCity,
        pincode,
        nativeStreet,
        nativeCity,
        nativePincode,
        category,
        mobileNo,
        parentMobileNo,
      },
      { abortEarly: false }
    );
    if (error) {
      const validationErrors = error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    const dobDate = new Date(dob);

    let studentPhoto = null;
    if (req.file) {
      uploadResult = await uploadToCloudinary(req.file.path);
      if (!uploadResult) {
        return res.status(500).json({
          success: false,
          message: "Photo upload failed, Please try again later",
        });
      }
      studentPhoto = {
        url: uploadResult.url,
        publicId: uploadResult.publicId,
      };
    }

    const name = {
      firstName,
      middleName,
      lastName,
      motherName,
    };

    const currentAddress = {
      street: currentStreet,
      city: currentCity,
      pincode: pincode,
    };

    const nativeAddress = {
      street: nativeStreet,
      city: nativeCity,
      nativePincode: nativePincode,
    };

    const studentWithAddedDetails = await Student.findByIdAndUpdate(
      studentId,
      {
        name,
        PRN,
        branch,
        year,
        dob: dobDate,
        bloodGroup,
        currentAddress,
        nativeAddress,
        category,
        mobileNo,
        parentMobileNo,
        studentPhoto,
      },
      { new: true }
    );
    dbSaved = true;

    res.status(201).json({
      success: true,
      data: studentWithAddedDetails,
      message: "Added details successfully!",
    });
  } catch (err) {
    console.error("Error in addStudentDetails:", err);

    if (!dbSaved && uploadResult) {
      await cloudinary.uploader.destroy(uploadResult.publicId);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const userId = req.user.id;

    const student = await Student.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const updateData = {
      "name.firstName": req.body.firstName,
      "name.middleName": req.body.middleName,
      "name.lastName": req.body.lastName,
      "name.motherName": req.body.motherName,
      PRN: req.body.PRN,
      branch: req.body.branch,
      year: req.body.year,
      dob: new Date(req.body.dob),
      bloodGroup: req.body.bloodGroup,
      category: req.body.category,
      mobileNo: req.body.mobileNo,
      parentMobileNo: req.body.parentMobileNo,
      "currentAddress.street": req.body.currentStreet,
      "currentAddress.city": req.body.currentCity,
      "currentAddress.pincode": req.body.pincode,
      "nativeAddress.street": req.body.nativeStreet,
      "nativeAddress.city": req.body.nativeCity,
      "nativeAddress.nativePincode": req.body.nativePincode,
    };

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.path);
      if (!uploadResult) {
        return res
          .status(500)
          .json({ success: false, message: "Photo upload failed" });
      }
      updateData.studentPhoto = {
        url: uploadResult.url,
        publicId: uploadResult.publicId,
      };
      if (student.studentPhoto?.publicId) {
        try {
          await cloudinary.uploader.destroy(student.studentPhoto.publicId);
        } catch (err) {
          console.error("Old photo deletion failed:", err.message);
        }
      }
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $set: updateData },
      { new: true, select: "-password" }
    );

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (err) {
    console.error("Error in updateStudent:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ==================== DELETE STUDENT ====================
const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const userId = req.user.id;

    const student = await Student.findById(studentId);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    if (req.user.role === "admin") {
      const adminExists = await Admin.findById(userId);
      if (!adminExists) {
        return res
          .status(403)
          .json({ success: false, message: "Admin not found or unauthorized" });
      }
    } else if (req.user.role === "student") {
      if (student._id.toString() !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: "Resource does not belong to logged in student",
        });
      }
    } else {
      return res.status(400).json({ success: false, message: "Bad Request" });
    }

    if (!student.studentPhoto.publicId) {
      return res.status(400).json({
        success: false,
        message: "To delete a student all details are necessary to be filled.",
      });
    }

    if (student.studentPhoto.publicId) {
      const delResult = await cloudinary.uploader.destroy(
        student.studentPhoto.publicId
      );

      console.log("Cloudinary delete result:", delResult);

      if (delResult.result !== "ok" && delResult.result !== "not found") {
        return res.status(500).json({
          success: false,
          message: "Cannot delete student. Please try again later.",
        });
      }
    }

    const result = await Student.findByIdAndDelete(studentId);

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Cannot delete student. Please try again later.",
      });
    }

    if (result) {
      await cascadeDeleteStudent(studentId);
    }

    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error in deleteStudent:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ==================== GET STUDENTS (WITH PAGINATION) ====================
const getStudents = async (req, res) => {
  try {
    const adminId = req.user.id;

    const adminExists = await Admin.exists({ _id: adminId });
    if (!adminExists) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const { year, search, page, limit } = req.query;

    const { error, value } = getStudentsValidation.validate(
      { year, search, page, limit },
      { abortEarly: false }
    );
    if (error) {
      const validationErrors = error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    const pageNum = value.page || 1;
    const limitNum = value.limit || 10;

    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (year) {
      filter.year = year.trim();
    }
    if (search) {
      const safeSearch = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      filter.$or = [
        { "name.firstName": { $regex: safeSearch, $options: "i" } },
        { "name.middleName": { $regex: safeSearch, $options: "i" } },
        { "name.lastName": { $regex: safeSearch, $options: "i" } },
        { "name.motherName": { $regex: safeSearch, $options: "i" } },
      ];
    }

    const total = await Student.countDocuments(filter);

    const students = await Student.find(filter)
      .skip(skip)
      .limit(limitNum)
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      data: students,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==================== GET SINGLE STUDENT BY ID (ADMIN) ====================
const getSingleStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, message: "Student ID is required" });
    }

    const adminId = req.user.id;

    if (req.user.role === "admin") {
      const adminExists = await Admin.findById(adminId);
      if (!adminExists) {
        return res
          .status(403)
          .json({ success: false, message: "Admin not found or unauthorized" });
      }
    } else {
      return res.status(400).json({ success: false, message: "Bad Request" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error in getSingleStudent:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==================== GET STUDENT BY ID (FOR STUDENT) ====================
const getStudentById = async (req, res) => {
  try {
    const studentId = req.user.id;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required, Please Login first",
      });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error in getStudentById : ", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==================== GET ALL STUDENTS (ADMIN ONLY) ====================
const getAllStudents = async (req, res) => {
  try {
    const adminId = req.user.id;

    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const adminExists = await Admin.findById(adminId);
    if (!adminExists) {
      return res
        .status(403)
        .json({ success: false, message: "Admin not found" });
    }

    const students = await Student.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: students,
      total: students.length,
    });
  } catch (err) {
    console.error("Error in getAllStudents:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==================== EXPORTS ====================
module.exports = {
  addStudentDetails,
  getStudentById,
  getStudents,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  importExcelDataWithPasswords,
  exportAllStudentsToExcel,
};
