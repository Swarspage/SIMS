// const Joi = require("joi");
const Joi = require("../helpers/profanity/joiWithProfanity");

// so for createInternship - we only need ot take care of the durationValidator rest evcerything is fine

//CHNAGES TO BE DONE:-
//make only YYYY-MM-DD type  od date acceptable and not YYYY/MM/DD because mongoose wont accept dates with "/" . the YYYY-MM-DD workds for joi.date and also for mongoose type:Date


// we have used JOi.date() for date related stuff
//What Joi.date() does: It accepts strings like "2024-01-15", "2024/01/15", ISO strings, or Date objects and converts them all to JS Date objects automatically


//IMP Notes related to durationValidator:-
/*
-> The / 30 fractional part accounts for day differences within a month before rounding, making it reasonably accurate without being too strict.

-> Math.round() gives a ±15 day tolerance, so e.g. Jan 1 → Feb 14 would round to 1 month. If you want stricter matching, use Math.floor() instead.

-> The .custom() runs after all individual field validations pass, so startDate, endDate, and durationMonths are already guaranteed to be valid values when this check runs.
*/

const strictDate = Joi.date()
  .custom((value, helpers) => {
    const original = helpers.original;

    if (typeof original === "string" && !/^\d{4}-\d{2}-\d{2}$/.test(original)) {
      return helpers.error("date.format");
    }

    return value;
  })
  .messages({
    "date.base": "Date must be a valid date.",
    "date.format": "Date must be in YYYY-MM-DD format."
  });
// duration validator is not proper yet --we have to change this
const validateDurationMonths = (value, helpers) => {
    const { startDate, endDate, durationMonths } = value;

    if (startDate && endDate && durationMonths !== undefined) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Calculate the difference in months (rounded)
        const diffDays = (end - start) / (1000 * 60 * 60 * 24);
        const diffMonths = Math.round(diffDays / 30) || 0;

        if (diffMonths !== durationMonths) {
            return helpers.error("object.durationMismatch");
        }
    }

    return value;

};

const durationMismatchMessage = {
    "object.durationMismatch": "Duration in months does not match the difference between start and end dates."
};


const internshipValidationSchema = Joi.object({
    companyName: Joi.string().trim().min(2).max(200).englishOnly().noProfanity().required().messages({
        "string.base": "Company name must be a string.",
        "string.min": "Company name must have at least 2 characters.",
        "string.max" : "Company Name can have a maximum of 200 characters.",
        "any.required": "Company name is required.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    role: Joi.string().trim().min(2).max(200).englishOnly().noProfanity().required().messages({
        "string.base": "Role must be a string.",
        "string.min": "Role must have at least 2 characters.",
        "string.max" : "Role can have a maximum of 200 characters.",
        "any.required": "Role is required.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    startDate: strictDate.max("now").required().messages({
        "date.base": "Start date must be a valid date.",
        "any.required": "Start date is required."
    }),

    endDate: strictDate.max("now").greater(Joi.ref("startDate")).required().messages({
        "date.base": "End date must be a valid date.",
        "date.greater": "End date must be greater than start date.",
        "any.required": "End date is required."
    }),

    durationMonths: Joi.number().integer().min(1).max(6).required().messages({
        "number.base": "Duration must be a number.",
        "number.integer": "Duration must be an integer.",
        "number.min": "Duration must be at least 1 month.",
        "number.max": "Duration cannot exceed 6 months.",
        "any.required": "Duration is required."
    }),

    isPaid: Joi.boolean().required().messages({
        "boolean.base": "isPaid must be true or false.",
        "any.required": "isPaid field is required."
    }),

    stipend: Joi.when("isPaid", {
        is: true,
        then: Joi.number().min(1).required().messages({
            "number.base": "Stipend must be a number.",
            "number.min": "Stipend must be at least 1.",
            "any.required": "Stipend is required for paid internships."
        }),
        otherwise: Joi.forbidden()
    }),

    description: Joi.string().trim().min(10).max(300).englishOnly().noProfanity().required().messages({
        "string.base": "Description must be a string.",
        "string.min": "Description must be at least 10 characters.",
        "string.max" : "Description can have a maximum of 300 characters.",
        "any.required": "Description is required.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    })
})
.custom(validateDurationMonths)
.messages(durationMismatchMessage)
.options({
    stripUnknown: true,
    convert: true,        
    abortEarly : false,
});


const updateInternshipValidationSchema = Joi.object({
    companyName: Joi.string().trim().min(2).max(200).englishOnly().noProfanity().optional().messages({
        "string.base": "Company name must be a string.",
        "string.min": "Company name must have at least 2 characters.",
        "string.max" : "Company name can have a maximum of 200 characters.",
        "string.empty" : "Company Name cannot be empty.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    role: Joi.string().trim().min(2).max(200).englishOnly().noProfanity().optional().messages({
        "string.base": "Role must be a string.",
        "string.min": "Role must have at least 2 characters.",
        "string.max" : "Role can have a maximum of 200 characters.",
        "string.empty" : "Role cannot be empty.",
        "string.profanity": "Inappropriate Language Not Allowed.",
    }),

    startDate: strictDate.max("now").optional().messages({
        "date.base": "Start date must be a valid date."
    }),


    endDate: strictDate.max("now").when("startDate", {
        is: Joi.exist(),
        then: strictDate.max("now").greater(Joi.ref("startDate")),
        otherwise: strictDate.max("now")
    }).messages({
        "date.base": "End date must be a valid date.",
        "date.greater": "End date must be greater than start date.",
        "date.max": "End date cannot be in the future."
    }),

    durationMonths: Joi.number().integer().min(1).max(6).optional().messages({
        "number.base": "Duration must be a number.",
        "number.integer": "Duration must be an integer.",
        "number.min": "Duration must be at least 1 month.",
        "number.max": "Duration cannot exceed 6 months."
    }),

    isPaid: Joi.boolean().optional().messages({
        "boolean.base": "isPaid must be true or false."
    }),

    stipend: Joi.when("isPaid", {
        is: true,
        then: Joi.number().min(1).optional().messages({
            "number.base": "Stipend must be a number.",
            "number.min": "Stipend must be at least 1."
        }),
        otherwise: Joi.forbidden()
    }),

    description: Joi.string().trim().min(10).max(300).englishOnly().noProfanity().optional().messages({
        "string.base": "Description must be a string.",
        "string.min": "Description must be at least 10 characters.",
        "string.max" : "Description can have a maximum of 300 characters.",
        "string.profanity": "Inappropriate Language Not Allowed.",
        "string.empty" : "Description cannot be empty."
    })
})
.options({
    stripUnknown: true,  // removes extra fields not in schema
    convert: true,        // automatic string -> number conversion
    abortEarly : false,
});

const getInternshipsValidation = Joi.object({
    year: Joi.string().trim().valid("SE", "TE", "BE").optional().messages({
        "any.only": "Year must be SE, TE, or BE."
    }),

    division: Joi.string().trim().valid("A", "B", "C").optional().messages({
        "any.only": "Division must be A, B, or C."
    }),

    isPaid: Joi.string().trim().valid("true", "false").optional().messages({
        "any.only": "isPaid must be true or false."
    }),

    export: Joi.string().trim().valid("true", "false").optional().messages({
        "any.only": "export must be true or false.",
        "boolean.base": "export must be either true or false."
    }),

    // NEW
    startDateFrom: Joi.date().optional().messages({
        "date.base": "startDateFrom must be a valid date."
    }),
    startDateTo: Joi.date().min(Joi.ref("startDateFrom")).optional().messages({
        "date.base": "startDateTo must be a valid date.",
        "date.min": "startDateTo must be after startDateFrom."
    }),
    endDateFrom: Joi.date().optional().messages({
        "date.base": "endDateFrom must be a valid date."
    }),
    endDateTo: Joi.date().min(Joi.ref("endDateFrom")).optional().messages({
        "date.base": "endDateTo must be a valid date.",
        "date.min": "endDateTo must be after endDateFrom."
    }),

    search: Joi.string().trim().max(100).optional().messages({
        "string.base": "Search must be a string.",
        "string.max": "Search cannot exceed 100 characters."
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
        "number.max": "Limit cannot exceed 20."
    })
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


module.exports = { internshipValidationSchema, updateInternshipValidationSchema, getInternshipsValidation, validateStudentID };
