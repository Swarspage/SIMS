const Joi = require("joi");

//create admission => student
const admissionCreateSchema = Joi.object({
  rollno: Joi.string().min(1).max(20).optional(),

  course: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  fees: Joi.number()
    .min(0)
    .required(),

  isScholarshipApplied: Joi.boolean().optional(),

  academicYear: Joi.string()
    .pattern(/^\d{4}-\d{4}$/)
    .required(),
});

//update admission => student | pending only
const admissionUpdateSchema = Joi.object({
  rollno: Joi.string().min(1).max(20).optional(),

  course: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  fees: Joi.number()
    .min(0)
    .optional(),

  isScholarshipApplied: Joi.boolean().optional(),
}).min(1);

//update admission status => admin | DI
const admissionStatusSchema = Joi.object({
  status: Joi.string()
    .valid("approved", "rejected")
    .required(),
});

//get all admissions => admin | DI
const getAdmissionsValidation = Joi.object({
  year: Joi.string().valid("FY", "SY", "TY").optional(),

  academicYear: Joi.string()
    .pattern(/^\d{4}-\d{4}$/)
    .optional(),

  search: Joi.string().max(100).optional(),

  page: Joi.number().integer().min(1).optional(),

  limit: Joi.number().integer().min(1).max(50).optional(),

  filterPaid: Joi.string()
    .valid("paid", "unpaid")
    .optional(),
});

module.exports = {
  admissionCreateSchema,
  admissionUpdateSchema,
  admissionStatusSchema,
  getAdmissionsValidation,
};
