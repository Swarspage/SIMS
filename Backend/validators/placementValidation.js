const Joi = require("joi");

//Common reusable year pattern: 2023-24
const yearPattern = /^\d{4}-\d{2}$/;
// i asked chatgpt just to add messages in every field and not change anything else
//but still it changes this reusable year regex pattern and changed it into :- const yearPattern = /^\\d{4}-\\d{2}$/;
//which is wrong


// CREATE
const createPlacementSchema = Joi.object({

	companyName: Joi.string().trim().min(1).max(200).required().messages({
		"string.base": "Company name must be a string",
		"string.empty": "Company name cannot be empty",
		"string.min": "Company name cannot be empty",
		"string.max" : "Company name can have maximum of 200 characters.",
		"any.required": "Company name is required"
	}),

	role: Joi.string().trim().min(1).max(200).required().messages({
		"string.base": "Role must be a string",
		"string.empty": "Role cannot be empty",
		"string.min": "Role cannot be empty",
		"string.max" : "Role can have maximum of 200 characters.",
		"any.required": "Role is required"
	}),

	placementType: Joi.string().valid("Campus", "Off-Campus").required().messages({
		"any.only": "Placement type must be either Campus or Off-Campus",
		"any.required": "Placement type is required"
	}),

	package: Joi.number().positive().min(1).max(100).precision(2).required().messages({
		"number.base": "Package must be a number",
		"number.positive": "Package must be a positive number",
		"number.min": "Package must be at least 1 LPA",
		"number.max": "Package cannot exceed 100 LPA",
		"any.required": "Package is required"
	}),

	placementYear: Joi.string().min(1).pattern(yearPattern).required().messages({
		"string.base": "Placement year must be a string",
		"string.empty": "Placement year cannot be empty",
		"string.pattern.base": "Placement year must be a valid year like 2023-24.",
		"any.required": "Placement year is required"
	}),

	passoutYear: Joi.string().min(1).pattern(yearPattern).required().messages({
		"string.base": "Passout year must be a string",
		"string.empty": "Passout year cannot be empty",
		"string.pattern.base": "Passout year must be a valid year like 2023-24.",
		"any.required": "Passout year is required"
	}),

	joiningYear: Joi.string().min(1).pattern(yearPattern).required().messages({
		"string.base": "Joining year must be a string",
		"string.empty": "Joining year cannot be empty",
		"string.pattern.base": "Joining year must be a valid year like 2023-24.",
		"any.required": "Joining year is required"
	}),
}).options({
	stripUnknown: true,   // removes extra fields
	convert: true,         // string -> number conversion allowed
	abortEarly: false
});



// UPDATE
const updatePlacementSchema = Joi.object({

	companyName: Joi.string().trim().min(1).max(200).empty("").optional().messages({
		"string.base": "Company name must be a string",
		"string.min": "Company name cannot be empty",
		"string.max" : "Company name can have maximum of 200 characters.",
	}),

	role: Joi.string().trim().min(1).max(200).empty("").optional().messages({
		"string.base": "Role must be a string",
		"string.min": "Role cannot be empty",
		"string.max" : "Role can have maximum of 200 characters.",
	}),

	placementType: Joi.string().valid("Campus", "Off-Campus").empty("").optional().messages({
		"any.only": "Placement type must be either Campus or Off-Campus",
	}),

	package: Joi.number().positive().min(1).max(100).precision(2).empty("").optional().messages({
		"number.base": "Package must be a number",
		"number.positive": "Package must be a positive number",
		"number.min": "Package must be at least 1 LPA",
		"number.max": "Package cannot exceed 100 LPA",
	}),

	placementYear: Joi.string().pattern(yearPattern).empty("").optional().messages({
		"string.base": "Placement year must be a string",
		"string.pattern.base": "Placement year must be a valid year like 2023-24.",
	}),

	passoutYear: Joi.string().pattern(yearPattern).empty("").optional().messages({
		"string.base": "Passout year must be a string",
		"string.pattern.base": "Passout year must be a valid year like 2023-24.",
	}),

	joiningYear: Joi.string().pattern(yearPattern).empty("").optional().messages({
		"string.base": "Joining year must be a string",
		"string.pattern.base": "Joining year must be a valid year like 2023-24.",
	}),

}).min(1)	// at least one field is required to update
.options({
	stripUnknown: true,   // removes extra fields
	convert: true,         // string -> number conversion allowed
	abortEarly: false
});




// GET / FILTER
const getPlacementsValidation = Joi.object({
	
	year: Joi.string().valid("SE", "TE", "BE").optional().messages({
		"any.only": "Year must be one of SE, TE, or BE",
		"string.base": "Year must be a string"
	}),

	division: Joi.string().valid("A", "B", "C").optional().messages({
		"any.only": "Division must be A, B, or C",
		"string.base": "Division must be a string"
	}),

	placementType: Joi.string().valid("Campus", "Off-Campus").optional().messages({
		"any.only": "Placement type must be either Campus or Off-Campus",
		"string.base": "Placement type must be a string"
	}),

	export: Joi.string().valid("true", "false").optional().messages({
		"any.only": "export must be true or false."
	}),

	// NEW
    placementYear:  Joi.string().pattern(yearPattern).optional().messages({
        "string.pattern.base": "placementYear must be in format like 2023-24."
    }),
    passoutYear:    Joi.string().pattern(yearPattern).optional().messages({
        "string.pattern.base": "passoutYear must be in format like 2023-24."
    }),
    joiningYear:    Joi.string().pattern(yearPattern).optional().messages({
        "string.pattern.base": "joiningYear must be in format like 2023-24."
    }),
    packageMin:     Joi.number().min(1).max(100).optional().messages({
        "number.base": "packageMin must be a number.",
        "number.min":  "packageMin must be at least 1 LPA.",
        "number.max":  "packageMin cannot exceed 100 LPA."
    }),
    packageMax:     Joi.number().min(Joi.ref("packageMin")).max(100).optional().messages({
        "number.base": "packageMax must be a number.",
        "number.min":  "packageMax must be greater than or equal to packageMin.",
        "number.max":  "packageMax cannot exceed 100 LPA."
    }),

	search: Joi.string().max(100).optional().messages({
		"string.base": "Search must be a string",
		"string.max": "Search cannot exceed 100 characters"
	}),

	page: Joi.number().integer().min(1).optional().messages({
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
});


//How to Call getPlacements API
/*
GET /placements?placementYear=2023-24
GET /placements?passoutYear=2024-25&joiningYear=2024-25
GET /placements?packageMin=5&packageMax=20
GET /placements?placementYear=2023-24&packageMin=10&placementType=Campus
*/


module.exports = { createPlacementSchema, updatePlacementSchema, getPlacementsValidation };
