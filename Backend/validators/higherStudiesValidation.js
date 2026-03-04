const Joi = require("../helpers/profanity/joiWithProfanity");


// --------------------------- CREATE HIGHER STUDY --------------------------- //
const createHigherStudySchema = Joi.object({
    examName: Joi.string().trim().valid("GATE", "CAT", "GRE", "TOEFL", "IELTS", "UPSC").required().messages({
        "any.required": "Exam name is required.",
        "string.base": "Exam name must be a string.",
        "any.only": "Exam name must be one of: GATE, CAT, GRE, TOFEL, IELTS, UPSC.",
        "string.empty" : "Exam Name cannot be empty."
    }),

    score: Joi.string()
    .trim()
    .pattern(/^\d+(\.\d+)?%?$|^\d+\/\d+$/)
    .max(15)
    .noProfanity()
    .required()
    .messages({
        "any.required": "Score is required.",
        "string.base": "Score must be a string.",
        "string.empty": "Score should not be empty.",
        "string.pattern.base":
        "Score must be a number, decimal, percentage (98%), or GRE format (165/155).",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),
}).options({
  convert:true,
  stripUnknown: true,
  abortEarly : false,
});

// --------------------------- UPDATE HIGHER STUDY --------------------------- //
const updateHigherStudySchema = Joi.object({
    examName: Joi.string().trim().valid("GATE", "CAT", "GRE", "TOEFL", "IELTS", "UPSC").messages({
        "string.base": "Exam name must be a string.",
        "any.only": "Exam name must be one of: GATE, CAT, GRE, TOFEL, IELTS, UPSC."
    }),

    score: Joi.string()
    .trim()
    .pattern(/^\d+(\.\d+)?%?$|^\d+\/\d+$/)
    .max(15)
    .noProfanity()
    .optional()
    .messages({
        "string.base": "Score must be a string.",
        "string.empty": "Score should not be empty.",
        "string.pattern.base":
        "Score must be a number, decimal, percentage (98%), or GRE format (165/155).",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),
}).min(1).options({
  convert:true,
  stripUnknown: true,
  abortEarly : false,
});

const getHigherStudiesValidation = Joi.object({
    year: Joi.string().trim().valid("SE", "TE", "BE").optional().messages({
        "string.base": "Year must be a string.",
        "any.only": "Year must be SE, TE or BE."
    }),

    division : Joi.string().trim().valid("A", "B", "C").optional().messages({
        "string.base": "Division must be a string.",
        "any.only": "Division must be A, B or C."
    }),

    examName: Joi.string().trim().valid("GATE", "CAT", "GRE", "TOEFL", "IELTS", "UPSC").optional().messages({
        "string.base": "Exam name must be a string.",
        "any.only": "Exam name must be one of: GATE, CAT, GRE, TOEFL, IELTS, UPSC."
    }),

    export: Joi.string().trim().valid("true", "false").optional().messages({
            "any.only": "export must be true or false.",
            "boolean.base": "export must be either true or false."
        }),

    search: Joi.string().trim().max(100).optional().messages({
        "string.base": "Search must be a string.",
        "string.max": "Search can be maximum 100 characters."
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
        "number.max": "Limit can be maximum 20."
    }),
});


module.exports = { createHigherStudySchema, updateHigherStudySchema, getHigherStudiesValidation };
