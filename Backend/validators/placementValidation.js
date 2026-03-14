const Joi = require("../helpers/profanity/joiWithProfanity");


//Common reusable year pattern: 2023-24
const yearPattern = /^\d{4}-\d{2}$/;
// i asked chatgpt just to add messages in every field and not change anything else
//but still it changes this reusable year regex pattern and changed it into :- const yearPattern = /^\\d{4}-\\d{2}$/;
//which is wrong

const academicYearValidator = (value, helpers) => {
	const [start, end] = value.split("-");
	const expectedEnd = String(Number(start) + 1).slice(-2);

	if (end !== expectedEnd) {
		return helpers.error("any.invalid");
	}

	return value;
};

// CREATE
const createPlacementSchema = Joi.object({

	companyName: Joi.string().trim().min(1).max(200).englishOnly().noProfanity().required().messages({
		"string.base": "Company name must be a string",
		"string.empty": "Company name cannot be empty",
		"string.min": "Company name cannot be empty",
		"string.max" : "Company name can have maximum of 200 characters.",
		"any.required": "Company name is required",
		"string.profanity": "Inappropriate Language Not Allowed.",
	}),

	role: Joi.string().trim().min(1).max(200).englishOnly().noProfanity().required().messages({
		"string.base": "Role must be a string",
		"string.empty": "Role cannot be empty",
		"string.min": "Role cannot be empty",
		"string.max" : "Role can have maximum of 200 characters.",
		"any.required": "Role is required",
		"string.profanity": "Inappropriate Language Not Allowed.",
	}),

	placementType: Joi.string().trim().valid("Campus", "Off-Campus").required().messages({
		"any.only": "Placement type must be either Campus or Off-Campus",
		"any.required": "Placement type is required",
		"string.empty" : "Placement Type cannot be empty."
	}),

	package: Joi.number().min(1).max(100).precision(2).required().messages({
		"number.base": "Package must be a number",
		"number.min": "Package must be at least 1 LPA",
		"number.max": "Package cannot exceed 100 LPA",
		"any.required": "Package is required"
	}),

	placementYear: Joi.string().trim().min(1).pattern(yearPattern).custom(academicYearValidator).required().messages({
		"string.base": "Placement year must be a string",
		"string.empty": "Placement year cannot be empty",
		"string.pattern.base": "Placement year must be a valid year like 2023-24.",
		"any.required": "Placement year is required",
		"any.invalid": "Year must follow format like 2023-24 where end year is start year + 1."
	}),

	passoutYear: Joi.string().trim().min(1).pattern(yearPattern).custom(academicYearValidator).required().messages({
		"string.base": "Passout year must be a string",
		"string.empty": "Passout year cannot be empty",
		"string.pattern.base": "Passout year must be a valid year like 2023-24.",
		"any.required": "Passout year is required",
		"any.invalid": "Year must follow format like 2023-24 where end year is start year + 1."
	}),

	joiningYear: Joi.string().trim().min(1).pattern(yearPattern).custom(academicYearValidator).required().messages({
		"string.base": "Joining year must be a string",
		"string.empty": "Joining year cannot be empty",
		"string.pattern.base": "Joining year must be a valid year like 2023-24.",
		"any.required": "Joining year is required",
		"any.invalid": "Year must follow format like 2023-24 where end year is start year + 1."
	}),
}).options({
	stripUnknown: true,   // removes extra fields
	convert: true,         // string -> number conversion allowed
	abortEarly: false
});



// UPDATE
const updatePlacementSchema = Joi.object({

	companyName: Joi.string().trim().min(1).max(200).englishOnly().noProfanity().optional().messages({
		"string.base": "Company name must be a string",
		"string.min": "Company name cannot be empty",
		"string.max" : "Company name can have maximum of 200 characters.",
		"string.empty" : "Company Name cannot be empty.",
		"string.profanity": "Inappropriate Language Not Allowed.",
	}),

	role: Joi.string().trim().min(1).max(200).englishOnly().noProfanity().optional().messages({
		"string.base": "Role must be a string",
		"string.min": "Role cannot be empty",
		"string.max" : "Role can have maximum of 200 characters.",
		"string.empty" : "Role cannot be empty.",
		"string.profanity": "Inappropriate Language Not Allowed.",
	}),

	placementType: Joi.string().trim().valid("Campus", "Off-Campus").optional().messages({
		"any.only": "Placement type must be either Campus or Off-Campus",
		"string.empty" : "Placement Type cannot be empty."
	}),

	package: Joi.number().min(1).max(100).precision(2).optional().messages({
		"number.base": "Package must be a number",
		"number.positive": "Package must be a positive number",
		"number.min": "Package must be at least 1 LPA",
		"number.max": "Package cannot exceed 100 LPA",
	}),

	placementYear: Joi.string().trim().pattern(yearPattern).custom(academicYearValidator).optional().messages({
		"string.base": "Placement year must be a string",
		"string.pattern.base": "Placement year must be a valid year like 2023-24.",
		"string.empty" : "Placement Year cannot be empty.",
		"any.invalid": "Year must follow format like 2023-24 where end year is start year + 1."
	}),

	passoutYear: Joi.string().trim().pattern(yearPattern).custom(academicYearValidator).optional().messages({
		"string.base": "Passout year must be a string",
		"string.pattern.base": "Passout year must be a valid year like 2023-24.",
		"string.empty" : "Passout Year cannot be empty.",
		"any.invalid": "Year must follow format like 2023-24 where end year is start year + 1."
	}),

	joiningYear: Joi.string().trim().pattern(yearPattern).custom(academicYearValidator).optional().messages({
		"string.base": "Joining year must be a string",
		"string.pattern.base": "Joining year must be a valid year like 2023-24.",
		"string.empty" : "Joining Year cannot be empty.",
		"any.invalid": "Year must follow format like 2023-24 where end year is start year + 1."
	}),

})
.options({
	stripUnknown: true,   // removes extra fields
	convert: true,         // string -> number conversion allowed
	abortEarly: false
});




// GET / FILTER
const getPlacementsValidation = Joi.object({
	
	year: Joi.string().trim().valid("SE", "TE", "BE").optional().messages({
		"any.only": "Year must be one of SE, TE, or BE",
		"string.base": "Year must be a string"
	}),

	division: Joi.string().trim().valid("A", "B", "C").optional().messages({
		"any.only": "Division must be A, B, or C",
		"string.base": "Division must be a string"
	}),

	placementType: Joi.string().trim().valid("Campus", "Off-Campus").optional().messages({
		"any.only": "Placement type must be either Campus or Off-Campus",
		"string.base": "Placement type must be a string"
	}),

	export: Joi.string().trim().valid("true", "false").optional().messages({
		"any.only": "export must be true or false.",
		"boolean.base": "export must be either true or false."
	}),

	// NEW
    placementYear: Joi.string().trim().pattern(yearPattern).custom(academicYearValidator).optional().messages({
        "string.pattern.base": "placementYear must be in format like 2023-24.",
		"any.invalid": "Year must follow format like 2023-24 where end year is start year + 1."
    }),
    passoutYear: Joi.string().trim().pattern(yearPattern).custom(academicYearValidator).optional().messages({
        "string.pattern.base": "passoutYear must be in format like 2023-24.",
		"any.invalid": "Year must follow format like 2023-24 where end year is start year + 1."
    }),
    joiningYear: Joi.string().trim().pattern(yearPattern).custom(academicYearValidator).optional().messages({
        "string.pattern.base": "joiningYear must be in format like 2023-24.",
		"any.invalid": "Year must follow format like 2023-24 where end year is start year + 1."
    }),
    packageMin: Joi.number().min(1).max(100).optional().messages({
        "number.base": "packageMin must be a number.",
        "number.min":  "packageMin must be at least 1 LPA.",
        "number.max":  "packageMin cannot exceed 100 LPA."
    }),
    packageMax: Joi.number()
		.max(100)
		.when("packageMin", {
			is: Joi.exist(),
			then: Joi.number().min(Joi.ref("packageMin")).max(100),
			otherwise: Joi.number().min(1).max(100)
		}).optional().messages({
			"number.base": "packageMax must be a number.",
			"number.min":  "packageMax must be greater than or equal to packageMin.",
			"number.max":  "packageMax cannot exceed 100 LPA."
    	}),

	search: Joi.string().trim().max(100).optional().messages({
		"string.base": "Search must be a string",
		"string.max": "Search cannot exceed 100 characters"
	}),

	page: Joi.number().integer().min(1).max(1000).optional().messages({
		"number.base": "Page must be a number",
		"number.integer": "Page must be an integer",
		"number.min": "Page must be at least 1"
	}),

	limit: Joi.number().integer().min(1).max(20).optional().messages({
		"number.base": "Limit must be a number",
		"number.integer": "Limit must be an integer",
		"number.min": "Limit must be at least 1",
		"number.max": "Limit cannot exceed 20"
	})
}).options({
	stripUnknown: true,
    convert: true,
    abortEarly: false
});

const validateStudentID = Joi.object({
    studentID: Joi.string()
        .trim()
        .pattern(/^[0-9]{4}[A-Z]{4}[0-9]{3}$/)
        .englishOnly().noProfanity()
        .required()
        .messages({
            "string.pattern.base": "Student ID must follow the format: 4 digits, 4 uppercase letters, 3 digits.",
            "string.empty": "Student ID cannot be empty.",
            "any.required": "Student ID is required."
        }),
}).options({
    stripUnknown : true,
    convert : true,
    abortEarly : false,
});


//How to Call getPlacements API
/*
GET /placements?placementYear=2023-24
GET /placements?passoutYear=2024-25&joiningYear=2024-25
GET /placements?packageMin=5&packageMax=20
GET /placements?placementYear=2023-24&packageMin=10&placementType=Campus
*/


module.exports = { createPlacementSchema, updatePlacementSchema, getPlacementsValidation, validateStudentID };
