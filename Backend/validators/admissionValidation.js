const Joi = require("joi");

//create admission => student
const admissionCreateSchema = Joi.object({
  rollno: Joi.string().min(1).max(20).optional()
  .messages({
    "string.min" : "Roll number must be at least 1 character long.",
    "string.max" : "Roll number cannot exceed 20 characters."
  }),

  course: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty" : "Course name is required.",
      "string.min" : "Course name must be at least 2 characters long.",
      "string.max" : "Course name cannot exceed 100 characters.",
      "any.required" : "Course name is required."
    }),

  fees: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base" : "Fees must be a valid number.",
      "number.min" : "Fees cannot be negative.",
      "any.required" : "Fees are required."
    }),

  isScholarshipApplied: Joi.boolean().optional()
  .messages({
    "boolean.base" : "Scholarship status must be true or false."
  }),

  academicYear: Joi.string()
    .pattern(/^\d{4}-\d{4}$/)
    .required()
    .messages({
      "string.empty" : "Academic year is required.",
      "string.pattern.base" : "Academic year must be in the format YYYY-YYYY.",
      "any.required" : "Academic year is required."
    }),
});

//update admission => student | pending only
const admissionUpdateSchema = Joi.object({
  rollno: Joi.string().min(1).max(20).optional()
  .messages({
    "string.min" : "Roll number must be at least 1 character long.",
    "string.max" : "Roll number cannot exceed 20 characters."
  }),

  course: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional()
    .messages({
      "string.empty" : "Course name cannot be empty.",
      "string.min" : "Course name must be at least 2 characters long.",
      "string.max" : "Course name cannot exceed 100 characters."
    }),

  fees: Joi.number()
    .min(0)
    .optional()
    .messages({
      "number.base" : "Fees must be a valid number.",
      "number.min" : "Fees cannot be negative."
    }),

  isScholarshipApplied: Joi.boolean().optional()
  .messages({
    "boolean.base" : "Scholarship status must be true or false."
  }),
}).min(1)
.messages({
  "object.min" : "At least one field must be provided for update."
});

//update admission status => admin | DI
const admissionStatusSchema = Joi.object({
  status: Joi.string()
    .valid("approved", "rejected")
    .required()
    .messages({
      "any.required" : "Status is required.",
      "any.only" : "Please select a valid status."
    }),
});

//get all admissions => admin | DI
const getAdmissionsValidation = Joi.object({
  year: Joi.string().valid("FY", "SY", "TY").optional()
  .messages({
    "any.only" : "Year must be one of FY, SY, or TY."
  }),

  academicYear: Joi.string()
    .pattern(/^\d{4}-\d{4}$/)
    .optional()
    .messages({
      "string.pattern.base" : "Academic year must be in the format YYYY-YYYY.",
    }),

  search: Joi.string().max(100).optional()
  .messages({
    "string.max" : "Search cannot exceed 100 characters."
  }),

  page: Joi.number().integer().min(1).optional().messages({
    "number.base" : "Page must be a valid number.",
    "number.integer" : "Page must be an integer.",
    "number.min" : "Page must be at least 1."
  }),

  limit: Joi.number().integer().min(1).max(50).optional()
  .messages({
    "number.base" : "Limit must be a valid number.",
    "number.integer" : "Limit must be an integer.",
    "number.min" : "Limit must be at least 1.",
    "number.max" : "Limit cannot exceed 50."
  }),

  filterPaid: Joi.string()
    .valid("paid", "unpaid")
    .optional()
    .messages({
      "any.only" : "Filter paid must be either 'paid' or 'unpaid'."
    }),
});

module.exports = {
  admissionCreateSchema,
  admissionUpdateSchema,
  admissionStatusSchema,
  getAdmissionsValidation,
};
