// const Joi = require("joi");
const Joi = require("../helpers/profanity/joiWithProfanity");

const internshipValidationSchema = Joi.object({
    companyName: Joi.string().trim().min(2).max(200).required().messages({
        "string.base": "Company name must be a string.",
        "string.min": "Company name must have at least 2 characters.",
        "string.max" : "Company Name can have a maximum of 200 characters.",
        "any.required": "Company name is required."
    }),

    role: Joi.string().trim().min(2).max(200).required().messages({
        "string.base": "Role must be a string.",
        "string.min": "Role must have at least 2 characters.",
        "string.max" : "Role can have a maximum of 200 characters.",
        "any.required": "Role is required."
    }),

    startDate: Joi.date().max("now").required().messages({
        "date.base": "Start date must be a valid date.",
        "any.required": "Start date is required."
    }),

    endDate: Joi.date().max("now").greater(Joi.ref("startDate")).required().messages({
        "date.base": "End date must be a valid date.",
        "date.greater": "End date must be greater than start date.",
        "any.required": "End date is required."
    }),

    durationMonths: Joi.number().integer().min(1).max(6).required().messages({
        "number.base": "Duration must be a number.",
        "number.integer": "Duration must be an integer.",
        "number.min": "Duration must be at least 1 month.",
        "number.max": "Duration cannot exceed 6 months.",
        "any.required": "Duration is required."
    }),

    isPaid: Joi.boolean().required().messages({
        "boolean.base": "isPaid must be true or false.",
        "any.required": "isPaid field is required."
    }),

    stipend: Joi.when("isPaid", {
        is: true,
        then: Joi.number().min(1).required().messages({
            "number.base": "Stipend must be a number.",
            "number.min": "Stipend must be at least 1.",
            "any.required": "Stipend is required for paid internships."
        }),
        otherwise: Joi.forbidden()
    }),

    description: Joi.string().trim().min(10).max(300).noProfanity().required().messages({
        "string.base": "Description must be a string.",
        "string.min": "Description must be at least 10 characters.",
        "string.max" : "Description can have a maximum of 300 characters.",
        "any.required": "Description is required.",
        "string.profanity": "Description contains inappropriate language."
    })
}).options({
    stripUnknown: true,
    convert: true,        
    abortEarly : false,
});


const updateInternshipValidationSchema = Joi.object({
    companyName: Joi.string().trim().min(2).max(200).empty("").optional().messages({
        "string.base": "Company name must be a string.",
        "string.min": "Company name must have at least 2 characters.",
        "string.max" : "Company name can have a maximum of 200 characters."
    }),

    role: Joi.string().trim().min(2).max(200).empty("").optional().messages({
        "string.base": "Role must be a string.",
        "string.min": "Role must have at least 2 characters.",
        "string.max" : "Role can have a maximum of 200 characters."
    }),

    startDate: Joi.date().max("now").optional().messages({
        "date.base": "Start date must be a valid date."
    }),

    endDate: Joi.date().max("now").greater(Joi.ref("startDate")).optional().messages({
        "date.base": "End date must be a valid date.",
        "date.greater": "End date must be greater than start date."
    }),

    durationMonths: Joi.number().integer().min(1).max(6).optional().messages({
        "number.base": "Duration must be a number.",
        "number.integer": "Duration must be an integer.",
        "number.min": "Duration must be at least 1 month.",
        "number.max": "Duration cannot exceed 6 months."
    }),

    isPaid: Joi.boolean().optional().messages({
        "boolean.base": "isPaid must be true or false."
    }),

    stipend: Joi.when("isPaid", {
        is: true,
        then: Joi.number().min(1).optional().messages({
            "number.base": "Stipend must be a number.",
            "number.min": "Stipend must be at least 1."
        }),
        otherwise: Joi.forbidden()
    }),

    description: Joi.string().trim().min(10).max(300).empty("").optional().messages({
        "string.base": "Description must be a string.",
        "string.min": "Description must be at least 10 characters.",
        "string.max" : "Description can have a maximum of 300 characters."
    })
})
.min(1) // At least one field is required
.options({
    stripUnknown: true,  // removes extra fields not in schema
    convert: true,        // automatic string -> number conversion
    abortEarly : false,
});

const getInternshipsValidation = Joi.object({
    year: Joi.string().valid("SE", "TE", "BE").optional().messages({
        "any.only": "Year must be SE, TE, or BE."
    }),

    division: Joi.string().valid("A", "B", "C").optional().messages({
        "any.only": "Division must be A, B, or C."
    }),

    isPaid: Joi.string().valid("true", "false").optional().messages({
        "any.only": "isPaid must be true or false."
    }),

    export: Joi.string().valid("true", "false").optional().messages({
        "any.only": "export must be true or false."
    }),

    search: Joi.string().max(100).optional().messages({
        "string.base": "Search must be a string.",
        "string.max": "Search cannot exceed 100 characters."
    }),

    page: Joi.number().integer().min(1).optional().messages({
        "number.base": "Page must be a number.",
        "number.integer": "Page must be an integer.",
        "number.min": "Page must be at least 1."
    }),

    limit: Joi.number().integer().min(1).max(20).optional().messages({
        "number.base": "Limit must be a number.",
        "number.integer": "Limit must be an integer.",
        "number.min": "Limit must be at least 1.",
        "number.max": "Limit cannot exceed 20."
    })
});


module.exports = { internshipValidationSchema, updateInternshipValidationSchema, getInternshipsValidation };
