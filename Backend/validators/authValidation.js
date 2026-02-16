// Division Incharge Login Schema Validation is in validators/DivisionInchargeValidation.js

const Joi = require("joi");

const signupSchema = Joi.object({
    studentID: Joi.string().pattern(/^[0-9]{4}[A-Z]{4}[0-9]{3}$/).required(),
    email: Joi.string().email().required(),
    // password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/).required(),
    firstName: Joi.string().pattern(/^[A-Za-z]+$/).required(),
    middleName: Joi.string().pattern(/^[A-Za-z]+$/).required(),
    lastName: Joi.string().pattern(/^[A-Za-z]+$/).required(),
    PRN: Joi.string().pattern(/^[1-9]\d{14}$/).required(),
    branch: Joi.string().valid("Computer", "IT", "AIDS", "Civil", "Chemical", "Mechanical").required(),
    year: Joi.string().valid("SE", "TE", "BE").required(),

});

const loginSchema = Joi.object({
    studentID: Joi.string().trim()
        .pattern(/^[0-9]{4}[A-Z]{4}[0-9]{3}$/)
        .required()
        .messages({
            "string.empty": "Student ID is required.",
            "string.pattern.base": "Student ID must follow the format: 4 digits + 4 uppercase letters + 3 digits.",
            "any.required": "Student ID is required."
        }),

    password: Joi.string().trim()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&]{8,14}$/)
        .required()
        .messages({
            "string.empty": "Password is required.",
            "string.pattern.base":
                "Password must be 8-14 characters long and include uppercase, lowercase, number, and special character.",
            "any.required": "Password is required."
        })
});



const adminLoginSchema = Joi.object({
    email: Joi.string().trim()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required.",
            "string.email": "Please enter a valid email address.",
            "any.required": "Email is required."
        }),

    password: Joi.string().trim()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/)
        .required()
        .messages({
            "string.empty": "Password is required.",
            "string.pattern.base":
                "Password must be 8-14 characters long and include uppercase, lowercase, number, and special character.",
            "any.required": "Password is required."
        })
});

const divisionInchargeLoginSchema = Joi.object({
   email: Joi.string().trim()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required.",
            "string.email": "Please enter a valid email address.",
            "any.required": "Email is required."
        }),

    password: Joi.string().trim()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/)
        .required()
        .messages({
            "string.empty": "Password is required.",
            "string.pattern.base":
                "Password must be 8-14 characters long and include uppercase, lowercase, number, and special character.",
            "any.required": "Password is required."
        })
});




module.exports = { signupSchema, loginSchema, adminLoginSchema, divisionInchargeLoginSchema };