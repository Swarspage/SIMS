const Joi = require("joi");

const importExcelSchema = Joi.object({
    studentID: Joi.string()
        .pattern(/^[0-9]{4}[A-Z]{4}[0-9]{3}$/)
        .required()
        .messages({
            "string.pattern.base": "Student ID must follow the format: 4 digits, 4 uppercase letters, 3 digits.",
            "string.empty": "Student ID is required.",
            "any.required": "Student ID is required."
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .trim()
        .lowercase()
        .required()
        .messages({
            "string.email": "Email must be a valid email address.",
            "string.empty": "Email is required.",
            "any.required": "Email is required."
        }),
});

const addStudentDetailsSchema = Joi.object({
    firstName: Joi.string().pattern(/^[A-Za-z]+$/).trim().required().messages({
        "string.pattern.base": "First Name must contain only alphabets.",
        "string.empty": "First Name is required.",
        "any.required": "First Name is required."
    }),

    middleName: Joi.string().pattern(/^[A-Za-z]+$/).trim().required().messages({
        "string.pattern.base": "Middle Name must contain only alphabets.",
        "string.empty": "Middle Name is required.",
        "any.required": "Middle Name is required."
    }),

    lastName: Joi.string().pattern(/^[A-Za-z]+$/).trim().required().messages({
        "string.pattern.base": "Last Name must contain only alphabets.",
        "string.empty": "Last Name is required.",
        "any.required": "Last Name is required."
    }),

    motherName: Joi.string().pattern(/^[A-Za-z]+$/).trim().required().messages({
        "string.pattern.base": "Mother Name must contain only alphabets.",
        "string.empty": "Mother Name is required.",
        "any.required": "Mother Name is required."
    }),

    PRN: Joi.string().pattern(/^[1-9]\d{15}$/).trim().required().messages({
        "string.pattern.base": "PRN must be a 16-digit number and cannot start with 0.",
        "string.empty": "PRN is required.",
        "any.required": "PRN is required."
    }),

    branch: Joi.string().valid("Computer", "IT", "AIDS", "Civil", "Chemical", "Mechanical")
        .required()
        .messages({
            "any.only": "Branch must be one of: Computer, IT, AIDS, Civil, Chemical, Mechanical.",
            "any.required": "Branch is required."
        }),

    year: Joi.string().valid("SE", "TE", "BE").required().messages({
        "any.only": "Year must be SE, TE, or BE.",
        "any.required": "Year is required."
    }),

    dob: Joi.date().required().messages({
        "date.base": "Date of Birth must be a valid date.",
        "any.required": "Date of Birth is required."
    }),

    bloodGroup: Joi.string().valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .required()
        .messages({
            "any.only": "Blood Group must be a valid type (A+, A-, B+, B-, AB+, AB-, O+, O-).",
            "any.required": "Blood Group is required."
        }),

    currentStreet: Joi.string().trim().required().messages({
        "string.empty": "Current Street is required.",
        "any.required": "Current Street is required."
    }),

    currentCity: Joi.string().trim().required().messages({
        "string.empty": "Current City is required.",
        "any.required": "Current City is required."
    }),

    pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).trim().required().messages({
        "string.pattern.base": "Pincode must be a 6-digit number and cannot start with 0.",
        "string.empty": "Pincode is required.",
        "any.required": "Pincode is required."
    }),

    nativeStreet: Joi.string().trim().required().messages({
        "string.empty": "Native Street is required.",
        "any.required": "Native Street is required."
    }),

    nativeCity: Joi.string().trim().required().messages({
        "string.empty": "Native City is required.",
        "any.required": "Native City is required."
    }),

    nativePincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).trim().required().messages({
        "string.pattern.base": "Native Pincode must be a 6-digit number and cannot start with 0.",
        "string.empty": "Native Pincode is required.",
        "any.required": "Native Pincode is required."
    }),

    category: Joi.string().valid("Open", "EWS", "EBC", "OBC", "SC", "ST", "Other")
        .required()
        .messages({
            "any.only": "Category must be one of: Open, EWS, EBC, OBC, SC, ST, Other.",
            "any.required": "Category is required."
        }),

    mobileNo: Joi.string().pattern(/^[6-9]\d{9}$/).trim().required().messages({
        "string.pattern.base": "Mobile number must be a 10-digit Indian number starting with 6-9.",
        "string.empty": "Mobile number is required.",
        "any.required": "Mobile number is required."
    }),

    parentMobileNo: Joi.string().pattern(/^[6-9]\d{9}$/).trim().required().messages({
        "string.pattern.base": "Parent Mobile number must be a 10-digit Indian number starting with 6-9.",
        "string.empty": "Parent Mobile number is required.",
        "any.required": "Parent Mobile number is required."
    }),

    parentEmail: Joi.string().email({ tlds: { allow: false } }).trim().lowercase().required().messages({
        "string.email": "Parent Email must be a valid email address.",
        "string.empty": "Parent Email is required.",
        "any.required": "Parent Email is required."
    }),

    abcId: Joi.string().pattern(/^\d{12}$/).trim().required().messages({
        "string.pattern.base": "ABC ID must be exactly 12 digits.",
        "string.empty": "ABC ID is required.",
        "any.required": "ABC ID is required."
    }),

    division: Joi.string().valid("A", "B", "C").required().messages({
        "any.only": "Division must be A, B, or C.",
        "any.required": "Division is required."
    }),

}).options({
    abortEarly: false,
    stripUnknown: true,
    convert: true
});


const updateStudentSchema = Joi.object({
    firstName: Joi.string().pattern(/^[A-Za-z]+$/).trim().messages({
        "string.pattern.base": "First Name must contain only alphabets."
    }),

    middleName: Joi.string().pattern(/^[A-Za-z]+$/).trim().messages({
        "string.pattern.base": "Middle Name must contain only alphabets."
    }),

    lastName: Joi.string().pattern(/^[A-Za-z]+$/).trim().messages({
        "string.pattern.base": "Last Name must contain only alphabets."
    }),

    motherName: Joi.string().pattern(/^[A-Za-z]+$/).trim().messages({
        "string.pattern.base": "Mother Name must contain only alphabets."
    }),

    PRN: Joi.string().pattern(/^[1-9]\d{15}$/).trim().messages({
        "string.pattern.base": "PRN must be a 16-digit number and cannot start with 0."
    }),

    branch: Joi.string().valid("Computer", "IT", "AIDS", "Civil", "Chemical", "Mechanical").messages({
        "any.only": "Branch must be one of: Computer, IT, AIDS, Civil, Chemical, Mechanical."
    }),

    year: Joi.string().valid("SE", "TE", "BE").messages({
        "any.only": "Year must be SE, TE, or BE."
    }),

    dob: Joi.date().messages({
        "date.base": "Date of Birth must be a valid date."
    }),

    bloodGroup: Joi.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .messages({
            "any.only": "Blood Group must be a valid type."
        }),

    currentStreet: Joi.string().trim(),

    currentCity: Joi.string().trim(),

    pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).trim().messages({
        "string.pattern.base": "Pincode must be a 6-digit number and cannot start with 0."
    }),

    nativeStreet: Joi.string().trim(),

    nativeCity: Joi.string().trim(),

    nativePincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).trim().messages({
        "string.pattern.base": "Native Pincode must be a 6-digit number and cannot start with 0."
    }),

    category: Joi.string().valid("Open", "EWS", "EBC", "OBC", "SC", "ST", "Other").messages({
        "any.only": "Category must be one of: Open, EWS, EBC, OBC, SC, ST, Other."
    }),

    mobileNo: Joi.string().pattern(/^[6-9]\d{9}$/).trim().messages({
        "string.pattern.base": "Mobile number must be a 10-digit Indian number starting with 6-9."
    }),

    parentMobileNo: Joi.string().pattern(/^[6-9]\d{9}$/).trim().messages({
        "string.pattern.base": "Parent Mobile number must be a 10-digit Indian number starting with 6-9."
    }),

    parentEmail: Joi.string().email({ tlds: { allow: false } }).trim().lowercase().messages({
        "string.email": "Parent Email must be a valid email address."
    }),

    abcId: Joi.string().pattern(/^\d{12}$/).trim().messages({
        "string.pattern.base": "ABC ID must be exactly 12 digits."
    }),

    division: Joi.string().valid("A", "B", "C").required().messages({
        "any.only": "Division must be A, B, or C.",
        "any.required": "Division is required."
    }),

}).min(1).options({
    abortEarly: false,
    stripUnknown: true,
    convert: true
});


const getStudentsValidation = Joi.object({
    year: Joi.string().valid("SE", "TE", "BE").optional().messages({
        "any.only": "Year must be SE, TE, or BE."
    }),

    branch: Joi.string().valid("Computer", "IT", "AIDS", "Civil", "Chemical", "Mechanical")
        .optional()
        .messages({
            "any.only": "Branch must be one of: Computer, IT, AIDS, Civil, Chemical, Mechanical."
        }),

    division: Joi.string().valid("A", "B", "C").optional().messages({
        "any.only": "Division must be A, B, or C."
    }),

    search: Joi.string().max(100).optional().messages({
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

    firstName: Joi.string().pattern(/^[A-Za-z]+$/).trim().optional().messages({
        "string.pattern.base": "First Name filter must contain only alphabets."
    }),

    middleName: Joi.string().pattern(/^[A-Za-z]+$/).trim().optional().messages({
        "string.pattern.base": "Middle Name filter must contain only alphabets."
    }),

    lastName: Joi.string().pattern(/^[A-Za-z]+$/).trim().optional().messages({
        "string.pattern.base": "Last Name filter must contain only alphabets."
    }),

    motherName: Joi.string().pattern(/^[A-Za-z]+$/).trim().optional().messages({
        "string.pattern.base": "Mother Name filter must contain only alphabets."
    }),

    city: Joi.string().trim().optional(),

    bloodGroup: Joi.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .optional()
        .messages({
            "any.only": "Blood Group filter must be a valid type."
        }),

    category: Joi.string()
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
