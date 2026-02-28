const DivisionIncharge = require("../models/DivisionIncharge");
const ExcelJS = require("exceljs");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");

const { importDivisionInchargeSchema } = require("../validators/divisionInchargeValidation");

const sendEmailBrevo = require("../services/sendEmailBrevo");

const generateRandomPassword = require("../helpers/generateRandomPassword");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Random password generator

// Helper to read Excel cell safely
const getCellValue = (cell) => {
  if (!cell) return "";
  if (typeof cell === "string") return cell.trim();
  if (typeof cell === "number") return cell.toString();
  if (cell?.text) return cell.text.trim();
  return "";
};

const importDivisionInchargeFromExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);

    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      return res.status(400).json({
        success: false,
        message: "Excel file is empty"
      });
    }

    // ----- Read headers -----
    const headerRow = worksheet.getRow(1);
    const headers = headerRow.values
      .slice(1)
      .map(h => h?.toString().trim().toLowerCase());

    const nameCol = headers.findIndex(h => h.includes("name")) + 1;
    const yearCol = headers.findIndex(h => h.includes("year")) + 1;
    const divisionCol = headers.findIndex(h => h.includes("division")) + 1;
    const emailCol = headers.findIndex(h => h.includes("email")) + 1;

    if (!nameCol || !yearCol || !divisionCol || !emailCol) {
      return res.status(400).json({
        success: false,
        message: "Excel must contain name, year, division and email columns"
      });
    }

    const rawData = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      rawData.push({
        name: getCellValue(row.getCell(nameCol)),
        year: getCellValue(row.getCell(yearCol)),
        division: getCellValue(row.getCell(divisionCol)),
        email: getCellValue(row.getCell(emailCol))
      });
    });

    const filteredData = rawData.filter(
      i => i.name && i.year && i.division && i.email
    );

    if (filteredData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid division incharge data found"
      });
    }

    if (filteredData.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Max 100 records allowed per upload"
      });
    }

    const toInsert = [];
    const emailJobs = [];
    const failed = [];

    // ----- Joi validation + password generation -----
    for (const data of filteredData) {
      const { error, value } = importDivisionInchargeSchema.validate(data, {
        abortEarly: false
      });

      if (error) {
        failed.push({
          email: data.email,
          error: error.details.map(e => e.message)
        });
        continue;
      }

      const plainPassword = generateRandomPassword(14);
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      toInsert.push({
        ...value,
        password: hashedPassword
      });

      emailJobs.push({
        name: value.name,
        email: value.email,
        password: plainPassword
      });
    }

    // ----- DB Insert -----
    let inserted = [];

    if (toInsert.length > 0) {
      try {
        inserted = await DivisionIncharge.insertMany(toInsert, {
          ordered: false
        });
      } catch (err) {
        console.error("Insert error:", err.message);
      }
    }

    // ----- Send emails in batches -----
    const BATCH_SIZE = 5;
    const DELAY = 3000;
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    for (let i = 0; i < emailJobs.length; i += BATCH_SIZE) {
      const batch = emailJobs.slice(i, i + BATCH_SIZE);

      await Promise.all(
        batch.map(job =>
          sgMail.send({
            to: job.email,
            from: process.env.SENDGRID_VERIFIED_SENDER,
            subject: "Division Incharge Account Created",
            text: `Hello ${job.name},

Your Division Incharge account has been created.

Email: ${job.email}
Password: ${job.password}`
          }).catch(err => {
            console.error(`Email failed for ${job.email}`, err.message);
            failed.push({
              email: job.email,
              error: "Email failed"
            });
          })
        )
      );

      if (i + BATCH_SIZE < emailJobs.length) {
        await sleep(DELAY);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Division Incharge import completed",
      summary: {
        received: filteredData.length,
        inserted: inserted.length,
        emailed: emailJobs.length - failed.length,
        failed: failed.length
      },
      failed
    });

  } catch (err) {
    console.error("Import error:", err);
    return res.status(500).json({
      success: false,
      message: "Error importing division incharge data"
    });
  }
};

const addSingleDivisionIncharge = async (req, res) => {
  try {
    const { name, year, division, email } = req.body;

    if (!name || !year || !division || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, year, division, email) are required"
      });
    }

    // Check if already exists
    const existing = await DivisionIncharge.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Division Incharge with this email already exists"
      });
    }

    // Generate password
    const plainPassword = generateRandomPassword(14);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newIncharge = await DivisionIncharge.create({
      name,
      year,
      division,
      email,
      password: hashedPassword
    });

    // Send Email
    await sendEmailBrevo({
      toEmail: email,
      subject: "Division Incharge Account Created",
      htmlContent: `
        <h2>Hello ${name},</h2>
        <p>Your Division Incharge account has been created. Please save this email so that even if you forget password, you can get back to this email. As currently we dont have a way to reset password in the system yet.</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${plainPassword}</p>
      `
    });




    return res.status(201).json({
      success: true,
      message: "Division Incharge added successfully and email sent",
      data: newIncharge
    });

  } catch (error) {
    console.error("Add Division Incharge Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding Division Incharge"
    });
  }
};


const getSingleDivisionInchargeById = async (req, res) => {
	try {
		const { id } = req.params;

		// If divisionIncharge trying to access someone else's profile --error should go
		if ( req.user.role === "divisionIncharge" && req.user.id !== id ) {
			return res.status(403).json({ success: false, message: "You are not allowed to access other Division Incharge's profile" });
		}

		let divisionInchargeId;

		if(req.user.role === "divisionIncharge"){
			divisionInchargeId = req.user.id;
		}else if(req.user.role === "admin"){
			divisionInchargeId = id;
		}else{
			return res.status(403).json({success : false, message: "You are not allowed to access this profile."});
		}

		const incharge = await DivisionIncharge.findById(divisionInchargeId).select("-password");

		if (!incharge) {
			return res.status(404).json({ success: false, message: "Division Incharge not found" });
		}

		return res.status(200).json({ success: true, data: incharge });

	} catch (error) {
		console.error("Get Single Error:", error);
		return res.status(500).json({ success: false, message: "Error fetching Division Incharge" });
	}
};


// yeh hatane wala controller yaha se hatane waali baat karo swar se
const loginDivisionIncharge = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }

    // Find division incharge
    const divisionIncharge = await DivisionIncharge.findOne({ email });
    if (!divisionIncharge) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, divisionIncharge.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Create Token
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      { id: divisionIncharge._id, role: "divisionIncharge", division: divisionIncharge.division, year: divisionIncharge.year },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: divisionIncharge._id,
        name: divisionIncharge.name,
        email: divisionIncharge.email,
        role: "divisionIncharge",
        division: divisionIncharge.division,
        year: divisionIncharge.year
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message
    });
  }
};

const getAllDivisionIncharges = async (req, res) => {
  try {
    const incharges = await DivisionIncharge.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: incharges
    });
  } catch (error) {
    console.error("Error fetching division incharges:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching division incharges"
    });
  }
};

// add joi validation to this adn then use value returned by joi
// admin has compulsorily assing some year and division, i they dont want to assign anything then just delete that Division Incharge
const updateDivisionIncharge = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year, division } = req.body;

    const incharge = await DivisionIncharge.findById(id);

    if (!incharge) {
      return res.status(404).json({
        success: false,
        message: "Division Incharge not found"
      });
    }

    if (name) incharge.name = name;
    if (year) incharge.year = year;
    if (division) incharge.division = division;

    await incharge.save();

    return res.status(200).json({
      success: true,
      message: "Division Incharge updated successfully",
      data: incharge
    });

  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating Division Incharge"
    });
  }
};

// if we rebuild the auth system then this will not be required.
const changeEmailOfDivisionIncharge = async (req, res) => {
  try {
    const { id, newEmail } = req.body;

    if (!id || !newEmail) {
      return res.status(400).json({
        success: false,
        message: "id and newEmail are required"
      });
    }

    const incharge = await DivisionIncharge.findById(id);

    if (!incharge) {
      return res.status(404).json({
        success: false,
        message: "Division Incharge not found"
      });
    }

    // Check if new email already exists
    const emailExists = await DivisionIncharge.findOne({ email: newEmail });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already in use"
      });
    }

    // Generate new password
    const plainPassword = generateRandomPassword(14);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    incharge.email = newEmail;
    incharge.password = hashedPassword;

    await incharge.save();

    // Send Email
    await sgMail.send({
      to: newEmail,
      from: process.env.SENDGRID_VERIFIED_SENDER,
      subject: "Division Incharge Email Updated",
      text: `Hello ${incharge.name},

Your email has been updated.

New Email: ${newEmail}
New Password: ${plainPassword}`
    });

    return res.status(200).json({
      success: true,
      message: "Email changed successfully and new credentials sent"
    });

  } catch (error) {
    console.error("Change Email Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error changing email"
    });
  }
};



const deleteDivisionIncharge = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIncharge = await DivisionIncharge.findByIdAndDelete(id);

    if (!deletedIncharge) {
      return res.status(404).json({
        success: false,
        message: "Division Incharge not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Division Incharge deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting division incharge:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting division incharge"
    });
  }
};

module.exports = {
  importDivisionInchargeFromExcel,
  addSingleDivisionIncharge,
  loginDivisionIncharge,
  getSingleDivisionInchargeById,
  getAllDivisionIncharges,
  changeEmailOfDivisionIncharge,
  updateDivisionIncharge,
  deleteDivisionIncharge
};
