const Joi = require("joi");


// --------------------------- CREATE HIGHER STUDY --------------------------- //
const createHigherStudySchema = Joi.object({
    examName: Joi.string().valid("GATE", "CAT", "GRE", "TOFEL", "IELTS", "UPSC").required().messages({
        "any.required": "Exam name is required.",
        "string.base": "Exam name must be a string.",
        "any.only": "Exam name must be one of: GATE, CAT, GRE, TOFEL, IELTS, UPSC."
    }),

    score: Joi.string().required().messages({
        "any.required": "Score is required.",
        "string.base": "Score must be a string."
    }),
}).options({
  convert:true,
  stripUnknown: true,
  abortEarly : false,
});

// --------------------------- UPDATE HIGHER STUDY --------------------------- //
const updateHigherStudySchema = Joi.object({
    examName: Joi.string().valid("GATE", "CAT", "GRE", "TOFEL", "IELTS", "UPSC").messages({
        "string.base": "Exam name must be a string.",
        "any.only": "Exam name must be one of: GATE, CAT, GRE, TOFEL, IELTS, UPSC."
    }),

    score: Joi.string().messages({
        "string.base": "Score must be a string."
    }),
}).min(1).options({
  convert:true,
  stripUnknown: true,
  abortEarly : false,
});

const getHigherStudiesValidation = Joi.object({
    year: Joi.string().valid("SE", "TE", "BE").optional().messages({
        "string.base": "Year must be a string.",
        "any.only": "Year must be SE, TE or BE."
    }),

    division : Joi.string().valid("A", "B", "C").optional().messages({
        "string.base": "Division must be a string.",
        "any.only": "Division must be A, B or C."
    }),

    examName: Joi.string().valid("GATE", "CAT", "GRE", "TOEFL", "IELTS", "UPSC").optional().messages({
        "string.base": "Exam name must be a string.",
        "any.only": "Exam name must be one of: GATE, CAT, GRE, TOEFL, IELTS, UPSC."
    }),

    export: Joi.string().valid("true", "false").optional().messages({
            "any.only": "export must be true or false."
        }),

    search: Joi.string().max(100).optional().messages({
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
