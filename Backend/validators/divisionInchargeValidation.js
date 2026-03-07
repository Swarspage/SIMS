const Joi = require("../helpers/profanity/joiWithProfanity");



const importDivisionInchargeSchema = Joi.object({
  name: Joi.string().trim()
    .min(2)
    .max(50)
	.englishOnly().noProfanity()
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "string.min": "Name must have at least 2 characters.",
      "string.max": "Name cannot exceed 50 characters.",
      "any.required": "Name is required."
    }),

  year: Joi.string().trim()
    .valid("SE", "TE", "BE")
	.englishOnly().noProfanity()
    .required()
    .messages({
      "string.base": "Year must be a string.",
      "any.only": "Year must be one of SE, TE, BE.",
      "any.required": "Year is required."
    }),

  division: Joi.string().trim()
    .valid("A", "B", "C")
	.englishOnly().noProfanity()
    .required()
    .messages({
      "string.base": "Division must be a string.",
      "any.only": "Division must be A, B, or C.",
      "any.required": "Division is required."
    }),

  email: Joi.string().trim()
    .email()
	.englishOnly().noProfanity()
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
	.englishOnly().noProfanity()
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "string.min": "Name must have at least 2 characters.",
      "string.max": "Name cannot exceed 50 characters.",
      "any.required": "Name is required."
    }),

  year: Joi.string().trim()
    .valid("SE", "TE", "BE")
	.englishOnly().noProfanity()
    .required()
    .messages({
      "string.base": "Year must be a string.",
      "any.only": "Year must be one of SE, TE, BE.",
      "any.required": "Year is required."
    }),

  division: Joi.string().trim()
    .valid("A", "B", "C")
	.englishOnly().noProfanity()
    .required()
    .messages({
      "string.base": "Division must be a string.",
      "any.only": "Division must be A, B, or C.",
      "any.required": "Division is required."
    }),

  email: Joi.string().trim()
    .email()
	.englishOnly().noProfanity()
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
		.englishOnly().noProfanity()
		.optional()
		.messages({
		"string.base": "Name must be a string.",
		"string.min": "Name must have at least 2 characters.",
		"string.max": "Name cannot exceed 50 characters.",
    "string.empty" : "Name cannot be empty."
	}),

	year: Joi.string().trim()
		.valid("SE", "TE", "BE")
		.englishOnly().noProfanity()
		.optional()
		.messages({
		"string.base": "Year must be a string.",
		"any.only": "Year must be one of SE, TE, BE.",
    "string.empty" : "Year cannot be empty."
	}),

	division: Joi.string().trim()
		.valid("A", "B", "C")
		.englishOnly().noProfanity()
		.optional()
		.messages({
		"string.base": "Division must be a string.",
		"any.only": "Division must be A, B, or C.",
    "string.empty" : "Division cannnot be empty."
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
		.englishOnly().noProfanity()
		.required()
		.messages({
		"string.base": "Email must be a string.",
		"string.email": "Please enter a valid email.",
		"any.required": "New email is required.",
    "string.empty" : "Email cannot be empty."
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

