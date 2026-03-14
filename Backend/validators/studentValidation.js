const Joi = require("../helpers/profanity/joiWithProfanity");

const addressPattern = /^[a-zA-Z0-9\s,./#()'-]+$/;
const namePattern = /^[A-Z][a-z]+$/;


const academicYearBase = Joi.string()
    .trim()
    .pattern(/^\d{4}-\d{4}$/)
    .custom((value, helpers) => {
        const [start, end] = value.split("-").map(Number);

        if (end !== start + 1) {
            return helpers.error("any.invalid");
        }

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // 1-indexed

        // June (6) passed means new academic year has started
        const newAcademicYearStarted = currentMonth > 6;

        const allowedStarts = new Set();

        // Previous academic year (e.g., 2025-2026 when current year is 2026)
        allowedStarts.add(currentYear - 1);

        // Current academic year (e.g., 2026-2027) only allowed after June
        if (newAcademicYearStarted) {
            allowedStarts.add(currentYear);
        }

        if (!allowedStarts.has(start)) {
            return helpers.error("any.invalid.year");
        }

        return value;
    })
    .messages({
        "string.pattern.base": "Academic Year must be in format YYYY-YYYY (e.g., 2024-2025).",
        "any.invalid": "Academic Year must be consecutive years (e.g., 2024-2025).",
        "any.invalid.year": `Please enter valid Academic Year.`,
        "string.empty": "Academic Year cannot be empty."
    });

const importExcelSchema = Joi.object({
    studentID: Joi.string()
        .trim()
        .pattern(/^[0-9]{4}[A-Z]{4}[0-9]{3}$/)
        .englishOnly().noProfanity()
        .required()
        .messages({
            "string.pattern.base": "Student ID must follow the format: 4 digits, 4 uppercase letters, 3 digits.",
            "string.empty": "Student ID cannot be empty.",
            "any.required": "Student ID is required."
        }),

    email: Joi.string()
        .email()
        .trim()
        .lowercase()
        .englishOnly().noProfanity()
        .required()
        .messages({
            "string.email": "Email must be a valid email address.",
            "string.empty": "Email cannot be empty.",
            "any.required": "Email is required."
        }),
});

const addStudentDetailsSchema = Joi.object({
    firstName: Joi.string().trim().pattern(namePattern).min(2).max(20).englishOnly().noProfanity().required().messages({
        "string.pattern.base": "First Name must contain only alphabets(minimum of 2 characters) and first letter must be capital.",
        "string.empty": "First Name cannot be empty.",
        "any.required": "First Name is required.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    middleName: Joi.string().trim().pattern(namePattern).min(2).max(20).englishOnly().noProfanity().required().messages({
        "string.pattern.base": "Middle Name must contain only alphabets(minimum of 2 characters) and first letter must be capital.",
        "string.empty": "Middle Name cannot be empty.",
        "any.required": "Middle Name is required.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    lastName: Joi.string().trim().pattern(namePattern).min(2).max(20).englishOnly().noProfanity().required().messages({
        "string.pattern.base": "Last Name must contain only alphabets(minimum of 2 characters) and first letter must be capital.",
        "string.empty": "Last Name cannot be empty.",
        "any.required": "Last Name is required.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    motherName: Joi.string().trim().pattern(namePattern).min(2).max(20).englishOnly().noProfanity().required().messages({
        "string.pattern.base": "Mother Name must contain only alphabets(minimum of 2 characters) and first letter must be capital.",
        "string.empty": "Mother Name cannot be empty.",
        "any.required": "Mother Name is required.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    PRN: Joi.string().trim().pattern(/^[1-9]\d{15}$/).required().messages({
        "string.pattern.base": "PRN must be a 16-digit number and cannot start with 0.",
        "string.empty": "PRN cannot be empty.",
        "any.required": "PRN is required."
    }),

    branch: Joi.string().trim().valid("Computer")
        .required()
        .messages({
            "any.only": "Branch can only be Computer",
            "any.required": "Branch is required."
        }),

    year: Joi.string().trim().valid("SE", "TE", "BE").required().messages({
        "any.only": "Year must be SE, TE, or BE.",
        "any.required": "Year is required."
    }),

    dob: Joi.date().max('now').required().messages({
        "date.base": "Date of Birth must be a valid date.",
        "any.required": "Date of Birth is required.",
        "string.empty" : "Dob cannot be empty.",
    }),

    bloodGroup: Joi.string().trim().valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .required()
        .messages({
            "any.only": "Blood Group must be a valid type (A+, A-, B+, B-, AB+, AB-, O+, O-).",
            "any.required": "Blood Group is required."
        }),

    currentStreet: Joi.string().trim().max(300).englishOnly().noProfanity().pattern(addressPattern).required().messages({
        "string.pattern.base" : "Current Street can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Current Street must not exceed 300 characters.",
        "string.empty": "Current Street cannot be empty",
        "any.required": "Current Street is required.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    currentCity: Joi.string().trim().max(200).englishOnly().noProfanity().pattern(addressPattern).required().messages({
        "string.pattern.base" : "Current City can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Current City must not exceed 200 characters.",
        "string.empty": "Current City cannot be empty.",
        "any.required": "Current City is required.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    pincode: Joi.string().trim().pattern(/^[1-9][0-9]{5}$/).required().messages({
        "string.pattern.base": "Pincode must be a 6-digit number and cannot start with 0.",
        "string.empty": "Pincode cannot be empty.",
        "any.required": "Pincode is required.",
    }),

    nativeStreet: Joi.string().trim().max(300).englishOnly().noProfanity().pattern(addressPattern).required().messages({
        "string.pattern.base" : "Native Street can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Native Street must not exceed 300 characters.",
        "string.empty": "Native Street cannot be empty.",
        "any.required": "Native Street is required.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    nativeCity: Joi.string().trim().max(200).englishOnly().noProfanity().pattern(addressPattern).required().messages({
        "string.pattern.base" : "Native City can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Native City must not exceed 200 characters.",
        "string.empty": "Native City cannot be empty.",
        "any.required": "Native City is required.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    nativePincode: Joi.string().trim().pattern(/^[1-9][0-9]{5}$/).required().messages({
        "string.pattern.base": "Native Pincode must be a 6-digit number and cannot start with 0.",
        "string.empty": "Native Pincode cannot be empty.",
        "any.required": "Native Pincode is required."
    }),

    category: Joi.string().trim().valid("Open", "EWS", "EBC", "OBC", "SC", "ST", "Other")
        .required()
        .messages({
            "any.only": "Category must be one of: Open, EWS, EBC, OBC, SC, ST, Other.",
            "any.required": "Category is required."
        }),

    mobileNo: Joi.string().trim().pattern(/^[6-9]\d{9}$/).required().messages({
        "string.pattern.base": "Mobile number must be a 10-digit Indian number starting with 6-9.",
        "string.empty": "Mobile number cannot be empty.",
        "any.required": "Mobile number is required."
    }),

    parentMobileNo: Joi.string().trim().pattern(/^[6-9]\d{9}$/).required().messages({
        "string.pattern.base": "Parent Mobile number must be a 10-digit Indian number starting with 6-9.",
        "string.empty": "Parent Mobile number cannot be empty.",
        "any.required": "Parent Mobile number is required."
    }),

    parentEmail: Joi.string().trim().email().lowercase().englishOnly().noProfanity().required().messages({
        "string.email": "Parent Email must be a valid email address.",
        "string.empty": "Parent Email cannot be empty.",
        "any.required": "Parent Email is required."
    }),

    abcId: Joi.string().trim().pattern(/^\d{12}$/).required().messages({
        "string.pattern.base": "ABC ID must be exactly 12 digits.",
        "string.empty": "ABC ID cannot be empty.",
        "any.required": "ABC ID is required."
    }),

    division: Joi.string().trim().valid("A", "B", "C").required().messages({
        "any.only": "Division must be A, B, or C.",
        "any.required": "Division is required."
    }),

    academicYear: academicYearBase.required().messages({
        "any.required": "Academic Year is required."
    }),

}).options({
    abortEarly: false,
    stripUnknown: true,
    convert: true
});


const updateStudentSchema = Joi.object({
    firstName: Joi.string().trim().pattern(namePattern).min(2).max(20).englishOnly().noProfanity().messages({
        "string.pattern.base": "First Name must contain only alphabets(minimum of 2 characters) and first letter must be capital.",
        "string.empty" : "First Name cannot be empty.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    middleName: Joi.string().trim().pattern(namePattern).min(2).max(20).englishOnly().noProfanity().messages({
        "string.pattern.base": "Middle Name must contain only alphabets(minimum of 2 characters) and first letter must be capital.",
        "string.empty" : "Middle Name cannot be empty.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    lastName: Joi.string().trim().pattern(namePattern).min(2).max(20).englishOnly().noProfanity().messages({
        "string.pattern.base": "Last Name must contain only alphabets(minimum of 2 characters) and first letter must be capital.",
        "string.empty" : "Last Name cannot be empty.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    motherName: Joi.string().trim().pattern(namePattern).min(2).max(20).englishOnly().noProfanity().messages({
        "string.pattern.base": "Mother Name must contain only alphabets(minimum of 2 characters) and first letter must be capital.",
        "string.empty" : "Mother's Name cannot be empty.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    PRN: Joi.string().trim().pattern(/^[1-9]\d{15}$/).messages({
        "string.pattern.base": "PRN must be a 16-digit number and cannot start with 0.",
        "string.empty" : "PRN cannot be empty.",
    }),

    branch: Joi.string().trim().valid("Computer").messages({
        "any.only": "Branch can only be Computer.",
        "string.empty" : "Branch cannot be empty.",
    }),

    year: Joi.string().trim().valid("SE", "TE", "BE").messages({
        "any.only": "Year must be SE, TE, or BE.",
        "string.empty" : "Year cannot be empty.",
    }),

    dob: Joi.date().max('now').messages({
        "date.base": "Date of Birth must be a valid date.",
        "string.empty" : "Dob cannot be empty.",
    }),

    bloodGroup: Joi.string().trim()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .messages({
            "any.only": "Blood Group must be a valid type.",
            "string.empty" : "Blood Group cannot be empty.",
        }),

    currentStreet: Joi.string().trim().min(4).max(300).englishOnly().noProfanity().pattern(addressPattern).messages({
        "string.pattern.base" : "Current Street can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Current Street must not exceed 300 characters.",
        "string.empty" : "Current Street cannot be empty.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    currentCity: Joi.string().trim().max(200).englishOnly().noProfanity().pattern(addressPattern).messages({
        "string.pattern.base" : "Current City can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Current City must not exceed 200 characters.",
        "string.empty" : "Current City cannot be empty.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    pincode: Joi.string().trim().pattern(/^[1-9][0-9]{5}$/).messages({
        "string.pattern.base": "Pincode must be a 6-digit number and cannot start with 0.",
        "string.empty" : "Pincode cannot be empty.",
    }),

    nativeStreet: Joi.string().trim().max(300).englishOnly().noProfanity().pattern(addressPattern).messages({
        "string.pattern.base" : "Native Street can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Native Street must not exceed 300 characters.",
        "string.empty" : "Native Street cannot be empty.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    nativeCity: Joi.string().trim().max(200).englishOnly().noProfanity().pattern(addressPattern).messages({
        "string.pattern.base" : "Native City can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Native City must not exceed 200 characters.",
        "string.empty" : "Native City cannot be empty.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    nativePincode: Joi.string().trim().pattern(/^[1-9][0-9]{5}$/).messages({
        "string.pattern.base": "Native Pincode must be a 6-digit number and cannot start with 0.",
        "string.empty" : "Native Pincode cannot be empty.",
    }),

    category: Joi.string().trim().valid("Open", "EWS", "EBC", "OBC", "SC", "ST", "Other").messages({
        "any.only": "Category must be one of: Open, EWS, EBC, OBC, SC, ST, Other.",
        "string.empty" : "Category cannot be empty.",
    }),

    mobileNo: Joi.string().trim().pattern(/^[6-9]\d{9}$/).messages({
        "string.pattern.base": "Mobile number must be a 10-digit Indian number starting with 6-9.",
        "string.empty" : "Mobile Number cannot be empty.",
    }),

    parentMobileNo: Joi.string().trim().pattern(/^[6-9]\d{9}$/).messages({
        "string.pattern.base": "Parent Mobile number must be a 10-digit Indian number starting with 6-9.",
        "string.empty" : "Parent Mobile Number cannot be empty.",
    }),

    parentEmail: Joi.string().trim().email().englishOnly().noProfanity().lowercase().messages({
        "string.email": "Parent Email must be a valid email address.",
        "string.empty" : "Parent Email cannot be empty.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    abcId: Joi.string().trim().pattern(/^\d{12}$/).messages({
        "string.pattern.base": "ABC ID must be exactly 12 digits.",
        "string.empty" : "ABC Id cannot be empty.",
    }),

    division: Joi.string().trim().valid("A", "B", "C").messages({
        "any.only": "Division must be A, B, or C.",
        "string.empty" : "Division cannot be empty.",
    }),

    academicYear: academicYearBase.optional(),

}).options({
    abortEarly: false,
    stripUnknown: true,
    convert: true
});


const getStudentsValidation = Joi.object({
    year: Joi.string().trim().valid("SE", "TE", "BE").optional().messages({
        "any.only": "Year must be SE, TE, or BE."
    }),

    branch: Joi.string().trim().valid("Computer")
        .optional()
        .messages({
            "any.only": "Branch can only be Computer."
        }),

    division: Joi.string().trim().valid("A", "B", "C").optional().messages({
        "any.only": "Division must be A, B, or C."
    }),

    export : Joi.boolean().optional().messages({
        "boolean.base": "export must be either true or false."
    }),

    detailsFilled : Joi.boolean().optional().messages({
        "boolean.base": "export must be either true or false."
    }),

    search: Joi.string().trim().max(100).optional().messages({
        "string.max": "Search query cannot exceed 100 characters."
    }),

    page: Joi.number().integer().min(1).optional().messages({
        "number.min": "Page must be at least 1.",
        "number.base": "Page must be a valid number."
    }),

    limit: Joi.number().integer().min(1).max(100).optional().messages({
        "number.min": "Limit must be at least 1.",
        "number.max": "Limit cannot exceed 100."
    }),

    academicYear: academicYearBase.optional(),

    firstName: Joi.string().trim().pattern(/^[A-Za-z]+$/).optional().messages({
        "string.pattern.base": "First Name filter must contain only alphabets."
    }),

    middleName: Joi.string().trim().pattern(/^[A-Za-z]+$/).optional().messages({
        "string.pattern.base": "Middle Name filter must contain only alphabets."
    }),

    lastName: Joi.string().trim().pattern(/^[A-Za-z]+$/).optional().messages({
        "string.pattern.base": "Last Name filter must contain only alphabets."
    }),

    motherName: Joi.string().trim().pattern(/^[A-Za-z]+$/).optional().messages({
        "string.pattern.base": "Mother Name filter must contain only alphabets."
    }),

    city: Joi.string().trim().optional(),

    bloodGroup: Joi.string().trim()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .optional()
        .messages({
            "any.only": "Blood Group filter must be a valid type."
        }),

    category: Joi.string().trim()
        .valid("Open", "EWS", "EBC", "OBC", "SC", "ST", "Other")
        .optional()
        .messages({
            "any.only": "Category filter must be one of: Open, EWS, EBC, OBC, SC, ST, Other."
        })
});

module.exports = {
    importExcelSchema,
    addStudentDetailsSchema,
    updateStudentSchema,
    getStudentsValidation
};
