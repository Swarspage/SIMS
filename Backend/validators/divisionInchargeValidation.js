const Joi = require("../helpers/profanity/joiWithProfanity");



const importDivisionInchargeSchema = Joi.object({
  name: Joi.string().trim()
    .min(2)
    .max(50)
	.noProfanity()
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "string.min": "Name must have at least 2 characters.",
      "string.max": "Name cannot exceed 50 characters.",
      "any.required": "Name is required."
    }),

  year: Joi.string().trim()
    .valid("SE", "TE", "BE")
	.noProfanity()
    .required()
    .messages({
      "string.base": "Year must be a string.",
      "any.only": "Year must be one of SE, TE, BE.",
      "any.required": "Year is required."
    }),

  division: Joi.string().trim()
    .valid("A", "B", "C")
	.noProfanity()
    .required()
    .messages({
      "string.base": "Division must be a string.",
      "any.only": "Division must be A, B, or C.",
      "any.required": "Division is required."
    }),

  email: Joi.string().trim()
    .email()
	.noProfanity()
    .required()
    .messages({
      "string.base": "Email must be a string.",
      "string.email": "Please enter a valid email.",
      "any.required": "Email is required."
    })
});



const addSingleDivisionInchargeSchema = Joi.object({
  name: Joi.string().trim()
    .min(2)
    .max(50)
	.noProfanity()
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "string.min": "Name must have at least 2 characters.",
      "string.max": "Name cannot exceed 50 characters.",
      "any.required": "Name is required."
    }),

  year: Joi.string().trim()
    .valid("SE", "TE", "BE")
	.noProfanity()
    .required()
    .messages({
      "string.base": "Year must be a string.",
      "any.only": "Year must be one of SE, TE, BE.",
      "any.required": "Year is required."
    }),

  division: Joi.string().trim()
    .valid("A", "B", "C")
	.noProfanity()
    .required()
    .messages({
      "string.base": "Division must be a string.",
      "any.only": "Division must be A, B, or C.",
      "any.required": "Division is required."
    }),

  email: Joi.string().trim()
    .email()
	.noProfanity()
    .required()
    .messages({
      "string.base": "Email must be a string.",
      "string.email": "Please enter a valid email.",
      "any.required": "Email is required."
    })
})
.options({
  stripUnknown: true,   // removes extra fields
  convert: true,        // trims and normalizes values
  abortEarly: false     // returns all errors at once
});



const changeDivisionInchargeDetailsSchema = Joi.object({
	name: Joi.string().trim()
		.min(2)
		.max(50)
		.noProfanity()
		.optional()
		.messages({
		"string.base": "Name must be a string.",
		"string.min": "Name must have at least 2 characters.",
		"string.max": "Name cannot exceed 50 characters.",
	}),

	year: Joi.string().trim()
		.valid("SE", "TE", "BE")
		.noProfanity()
		.optional()
		.messages({
		"string.base": "Year must be a string.",
		"any.only": "Year must be one of SE, TE, BE.",
	}),

	division: Joi.string().trim()
		.valid("A", "B", "C")
		.noProfanity()
		.optional()
		.messages({
		"string.base": "Division must be a string.",
		"any.only": "Division must be A, B, or C.",
	}),
})
.or("name", "year", "division")
.messages({
    "object.missing": "At least one field (name, year, or division) must be provided.",
  })
.options({
	stripUnknown: true,
	convert: true,
	abortEarly: false,
});


const changeEmailOfDivisionInchargeSchema = Joi.object({
	newEmail: Joi.string().trim()
		.email()
		.lowercase()
		.noProfanity()
		.required()
		.messages({
		"string.base": "Email must be a string.",
		"string.email": "Please enter a valid email.",
		"any.required": "New email is required.",
	}),
}).options({
	stripUnknown: true,
	convert: true,
	abortEarly: false,
});

module.exports = {
  importDivisionInchargeSchema,
  addSingleDivisionInchargeSchema,
  changeDivisionInchargeDetailsSchema,
  changeEmailOfDivisionInchargeSchema,
};

