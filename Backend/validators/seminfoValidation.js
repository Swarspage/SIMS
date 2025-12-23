const Joi = require("joi");

//mark schema
const markSchema = Joi.object({
  subject: Joi.string()
    .trim()
    .min(1)
    .required(),

  score: Joi.number()
    .min(0)
    .required(),

  outOf: Joi.number()
    .min(1)
    .required(),
});

//create sem info
const semInfoCreateSchema = Joi.object({
  semester: Joi.number()
    .integer()
    .min(1)
    .max(8)
    .required(),

  attendance: Joi.number()
    .min(0)
    .max(100)
    .required(),

  kts: Joi.array()
    .items(Joi.string().trim())
    .default([]),

  marks: Joi.array()
    .items(markSchema)
    .min(1)
    .required(),
});

//update sem info
const semInfoUpdateSchema = Joi.object({
  semester: Joi.number()
    .integer()
    .min(1)
    .max(8)
    .optional(),

  attendance: Joi.number()
    .min(0)
    .max(100)
    .optional(),

  kts: Joi.array()
    .items(Joi.string().trim())
    .optional(),

  marks: Joi.array()
    .items(markSchema)
    .min(1)
    .optional(),
}).min(1); // at least one field required

module.exports = {
  semInfoCreateSchema,
  semInfoUpdateSchema,
};
