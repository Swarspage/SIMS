const Joi = require("joi");

const addressPattern = /^[a-zA-Z0-9\s,./#()'-]+$/;

const importExcelSchema = Joi.object({
    studentID: Joi.string()
        .pattern(/^[0-9]{4}[A-Z]{4}[0-9]{3}$/)
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
        .required()
        .messages({
            "string.email": "Email must be a valid email address.",
            "string.empty": "Email cannot be empty.",
            "any.required": "Email is required."
        }),
});

const addStudentDetailsSchema = Joi.object({
    firstName: Joi.string().pattern(/^[A-Za-z]+$/).trim().required().messages({
        "string.pattern.base": "First Name must contain only alphabets.",
        "string.empty": "First Name cannot be empty.",
        "any.required": "First Name is required."
    }),

    middleName: Joi.string().pattern(/^[A-Za-z]+$/).trim().required().messages({
        "string.pattern.base": "Middle Name must contain only alphabets.",
        "string.empty": "Middle Name cannot be empty.",
        "any.required": "Middle Name is required."
    }),

    lastName: Joi.string().pattern(/^[A-Za-z]+$/).trim().required().messages({
        "string.pattern.base": "Last Name must contain only alphabets.",
        "string.empty": "Last Name cannot be empty.",
        "any.required": "Last Name is required."
    }),

    motherName: Joi.string().pattern(/^[A-Za-z]+$/).trim().required().messages({
        "string.pattern.base": "Mother Name must contain only alphabets.",
        "string.empty": "Mother Name cannot be empty.",
        "any.required": "Mother Name is required."
    }),

    PRN: Joi.string().pattern(/^[1-9]\d{15}$/).trim().required().messages({
        "string.pattern.base": "PRN must be a 16-digit number and cannot start with 0.",
        "string.empty": "PRN cannot be empty.",
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

    dob: Joi.date().max('now').required().messages({
        "date.base": "Date of Birth must be a valid date.",
        "any.required": "Date of Birth is required.",
        "string.empty" : "Dob cannot be empty.",
    }),

    bloodGroup: Joi.string().valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .required()
        .messages({
            "any.only": "Blood Group must be a valid type (A+, A-, B+, B-, AB+, AB-, O+, O-).",
            "any.required": "Blood Group is required."
        }),

    currentStreet: Joi.string().max(300).trim().pattern(addressPattern).required().messages({
        "string.pattern.base" : "Current Street can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Current Street must not exceed 300 characters.",
        "string.empty": "Current Street cannot be empty",
        "any.required": "Current Street is required."
    }),

    currentCity: Joi.string().max(200).trim().pattern(addressPattern).required().messages({
        "string.pattern.base" : "Current City can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Current City must not exceed 200 characters.",
        "string.empty": "Current Street cannot be empty.",
        "any.required": "Current Street is required."
    }),

    pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).trim().required().messages({
        "string.pattern.base": "Pincode must be a 6-digit number and cannot start with 0.",
        "string.empty": "Pincode cannot be empty.",
        "any.required": "Pincode is required."
    }),

    nativeStreet: Joi.string().max(300).trim().pattern(addressPattern).required().messages({
        "string.pattern.base" : "Native Street can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Native Street must not exceed 300 characters.",
        "string.empty": "Current Street cannot be empty.",
        "any.required": "Current Street is required."
    }),

    nativeCity: Joi.string().max(200).trim().pattern(addressPattern).required().messages({
        "string.pattern.base" : "Native City can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Native City must not exceed 200 characters.",
        "string.empty": "Current Street cannot be empty.",
        "any.required": "Current Street is required."
    }),

    nativePincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).trim().required().messages({
        "string.pattern.base": "Native Pincode must be a 6-digit number and cannot start with 0.",
        "string.empty": "Native Pincode cannot be empty.",
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
        "string.empty": "Mobile number cannot be empty.",
        "any.required": "Mobile number is required."
    }),

    parentMobileNo: Joi.string().pattern(/^[6-9]\d{9}$/).trim().required().messages({
        "string.pattern.base": "Parent Mobile number must be a 10-digit Indian number starting with 6-9.",
        "string.empty": "Parent Mobile number cannot be empty.",
        "any.required": "Parent Mobile number is required."
    }),

    parentEmail: Joi.string().email().trim().lowercase().required().messages({
        "string.email": "Parent Email must be a valid email address.",
        "string.empty": "Parent Email cannot be empty.",
        "any.required": "Parent Email is required."
    }),

    abcId: Joi.string().pattern(/^\d{12}$/).trim().required().messages({
        "string.pattern.base": "ABC ID must be exactly 12 digits.",
        "string.empty": "ABC ID cannot be empty.",
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
        "string.pattern.base": "First Name must contain only alphabets.",
        "string.empty" : "First Name cannot be empty.",
    }),

    middleName: Joi.string().pattern(/^[A-Za-z]+$/).trim().messages({
        "string.pattern.base": "Middle Name must contain only alphabets.",
        "string.empty" : "Middle Name cannot be empty.",
    }),

    lastName: Joi.string().pattern(/^[A-Za-z]+$/).trim().messages({
        "string.pattern.base": "Last Name must contain only alphabets.",
        "string.empty" : "Last Name cannot be empty.",
    }),

    motherName: Joi.string().pattern(/^[A-Za-z]+$/).trim().messages({
        "string.pattern.base": "Mother Name must contain only alphabets.",
        "string.empty" : "Mother's Name cannot be empty.",
    }),

    PRN: Joi.string().pattern(/^[1-9]\d{15}$/).trim().messages({
        "string.pattern.base": "PRN must be a 16-digit number and cannot start with 0.",
        "string.empty" : "PRN cannot be empty.",
    }),

    branch: Joi.string().valid("Computer", "IT", "AIDS", "Civil", "Chemical", "Mechanical").messages({
        "any.only": "Branch must be one of: Computer, IT, AIDS, Civil, Chemical, Mechanical.",
        "string.empty" : "Branch cannot be empty.",
    }),

    year: Joi.string().valid("SE", "TE", "BE").messages({
        "any.only": "Year must be SE, TE, or BE.",
        "string.empty" : "Year cannot be empty.",
    }),

    dob: Joi.date().max('now').messages({
        "date.base": "Date of Birth must be a valid date.",
        "string.empty" : "Dob cannot be empty.",
    }),

    bloodGroup: Joi.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .messages({
            "any.only": "Blood Group must be a valid type.",
            "string.empty" : "Blood Group cannot be empty.",
        }),

    currentStreet: Joi.string().max(300).trim().pattern(addressPattern).messages({
        "string.pattern.base" : "Current Street can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Current Street must not exceed 300 characters.",
        "string.empty" : "Current Street cannot be empty.",
    }),

    currentCity: Joi.string().max(200).trim().pattern(addressPattern).messages({
        "string.pattern.base" : "Current City can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Current City must not exceed 200 characters.",
        "string.empty" : "Current City cannot be empty.",
    }),

    pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).trim().messages({
        "string.pattern.base": "Pincode must be a 6-digit number and cannot start with 0.",
        "string.empty" : "Pincode cannot be empty.",
    }),

    nativeStreet: Joi.string().max(300).trim().pattern(addressPattern).messages({
        "string.pattern.base" : "Native Street can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Native Street must not exceed 300 characters.",
        "string.empty" : "Native Street cannot be empty.",
    }),

    nativeCity: Joi.string().max(200).trim().pattern(addressPattern).messages({
        "string.pattern.base" : "Native City can contain only letters, numbers, spaces, and these symbols: , . - / # ( )",
        "string.max" : "Native City must not exceed 200 characters.",
        "string.empty" : "Native City cannot be empty.",
    }),

    nativePincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).trim().messages({
        "string.pattern.base": "Native Pincode must be a 6-digit number and cannot start with 0.",
        "string.empty" : "Native Pincode cannot be empty.",
    }),

    category: Joi.string().valid("Open", "EWS", "EBC", "OBC", "SC", "ST", "Other").messages({
        "any.only": "Category must be one of: Open, EWS, EBC, OBC, SC, ST, Other.",
        "string.empty" : "Category cannot be empty.",
    }),

    mobileNo: Joi.string().pattern(/^[6-9]\d{9}$/).trim().messages({
        "string.pattern.base": "Mobile number must be a 10-digit Indian number starting with 6-9.",
        "string.empty" : "Mobile Number cannot be empty.",
    }),

    parentMobileNo: Joi.string().pattern(/^[6-9]\d{9}$/).trim().messages({
        "string.pattern.base": "Parent Mobile number must be a 10-digit Indian number starting with 6-9.",
        "string.empty" : "Parent Mobile Number cannot be empty.",
    }),

    parentEmail: Joi.string().email().trim().lowercase().messages({
        "string.email": "Parent Email must be a valid email address.",
        "string.empty" : "Parent Email cannot be empty.",
    }),

    abcId: Joi.string().pattern(/^\d{12}$/).trim().messages({
        "string.pattern.base": "ABC ID must be exactly 12 digits.",
        "string.empty" : "ABC Id cannot be empty.",
    }),

    division: Joi.string().valid("A", "B", "C").messages({
        "any.only": "Division must be A, B, or C.",
        "string.empty" : "Division cannot be empty.",
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

    export : Joi.boolean().optional().messages({
        "any.only" : "export must be either true or false."
    }),

    detailsFilled : Joi.boolean().optional().messages({
        "any.only" : "detailsFilled must be either true or false."
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
