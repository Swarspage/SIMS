const Joi = require("joi");

const divisionInchargeLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required."
  }),

  password: Joi.string().required().messages({
    "string.base": "Password must be a string.",
    "any.required": "Password is required."
  }),
});


const importDivisionInchargeSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "string.min": "Name must have at least 2 characters.",
      "string.max": "Name cannot exceed 50 characters.",
      "any.required": "Name is required."
    }),

  year: Joi.string()
    .valid("SE", "TE", "BE")
    .required()
    .messages({
      "string.base": "Year must be a string.",
      "any.only": "Year must be one of SE, TE, BE.",
      "any.required": "Year is required."
    }),

  division: Joi.string()
    .valid("A", "B", "C")
    .required()
    .messages({
      "string.base": "Division must be a string.",
      "any.only": "Division must be A, B, or C.",
      "any.required": "Division is required."
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": "Email must be a string.",
      "string.email": "Please enter a valid email.",
      "any.required": "Email is required."
    })
});

module.exports = {
  importDivisionInchargeSchema, divisionInchargeLoginSchema
};
