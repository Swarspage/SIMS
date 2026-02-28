const Joi = require("joi");

//mark schema
const markSchema = Joi.object({
  subject: Joi.string()
    .trim()
    .min(1)
    .required()
    .messages({
      "string.empty" : "Subject name is required.",
      "string.min" : "Subject name must be at least 1 character long.",
      "any.required" : "Subject name is required."
    }),

  score: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base" : "Score must be a valid number.",
      "number.min" : "Score cannot be negative.",
      "any.required" : "Score is required."
    }),

  outOf: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.base" : "Total marks must be a valid number.",
      "number.min" : "Total marks must be at least 1.",
      "any.required" : "Total marks is required."
    }),
});

//create sem info
const semInfoCreateSchema = Joi.object({
  semester: Joi.number()
    .integer()
    .min(1)
    .max(8)
    .required()
    .messages({
      "number.base" : "Semester must be a valid number.",
      "number.integer" : "Semester must be an integer.",
      "number.min" : "Semester must be at least 1.",
      "number.max" : "Semester cannot exceed 8.",
      "any.required" : "Semester is required."
    }),

  attendance: Joi.number()
    .min(0)
    .max(100)
    .required()
    .messages({
      "number.base" : "Attendance must be a valid number.",
      "number.min" : "Attendance cannot be negative.",
      "number.max" : "Attendance cannot exceed 100%.",
      "any.required" : "Attendance is required."
    }),

  kts: Joi.array()
    .items(Joi.string().trim().messages({"string.base" : "Each KT subject name must be a string."}))
    .default([]).messages({"array.base" : "KTs must be an array."}),

  marks: Joi.array()
    .items(markSchema)
    .min(1)
    .required()
    .messages({
      "array.base" : "Marks must be an array.",
      "array.min" : "At least one subject mark is required." ,
      "any.required" : "Marks are required."
    }),
});

//update sem info
const semInfoUpdateSchema = Joi.object({
  semester: Joi.number()
    .integer()
    .min(1)
    .max(8)
    .optional()
    .messages({
      "number.base" : "Semester must be a valid number.",
      "number.integer" : "Semester must be an integer.",
      "number.min" : "Semester must be at least 1.",
      "number.max" : "Semester cannot exceed 8.",
    }),

  attendance: Joi.number()
    .min(0)
    .max(100)
    .optional()
    .messages({
      "number.base" : "Attendance must be a valid number.",
      "number.min" : "Attendance cannot be negative.",
      "number.max" : "Attendance cannot exceed 100%.",
    }),

  kts: Joi.array()
    .items(Joi.string().trim().messages({"string.base" : "Each KT subject name must be a string."}))
    .optional().messages({"array.base" : "KTs must be an array."}),

  marks: Joi.array()
    .items(markSchema)
    .min(1)
    .optional()
    .messages({
      "array.base" : "Marks must be an array.",
      "array.min" : "At least one subject mark is required." ,
    })
}).min(1)
.messages({
  "object.min" : "At least one field must be provided for update."
}); // at least one field required

module.exports = {
  semInfoCreateSchema,
  semInfoUpdateSchema,
};
