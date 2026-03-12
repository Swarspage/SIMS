// const Joi = require("joi");
const Joi = require("../helpers/profanity/joiWithProfanity");
const textWithNumberRegex = /^(?!\d+$)[A-Za-z0-9\s.,!?'-]+$/;

//create admission
const admissionCreateSchema = Joi.object({
  year: Joi.string()
    .trim()
    .valid("FY", "SY", "TY")
    .optional()
    .messages({
      "any.only": "Year must be one of FY, SY, or TY.",
      "string.empty": "Year cannot be empty."
    }),

  div: Joi.string()
    .trim()
    .pattern(textWithNumberRegex)
    .max(10)
    .noProfanity()
    .required()
    .messages({
      "string.pattern.base": "Division must contain only letters, numbers and allowed characters.",
      "string.noProfanity": "Division contains inappropriate language.",
      "string.empty": "Division cannot be empty.",
      "any.required": "Division is required."
    }),

  rollno: Joi.string()
    .trim()
    .pattern(/^\d+$/)
    .required()
    .messages({
      "string.pattern.base": "Roll number must contain only digits.",
      "string.empty": "Roll number cannot be empty.",
      "any.required": "Roll number is required."
    }),

  course: Joi.string()
    .trim()
    .pattern(textWithNumberRegex)
    .min(2)
    .max(100)
    .noProfanity()
    .default("Computer Engineering")
    .required()
    .messages({
      "string.empty": "Course name is required.",
      "string.min": "Course name must be at least 2 characters long.",
      "string.max": "Course name cannot exceed 100 characters.",
      "string.pattern.base":
        "Course name must contain only letters, numbers, and special characters like commas, periods, exclamation marks, question marks, and hyphens.",
      "string.noProfanity": "Course name contains inappropriate language.",
      "any.required": "Course name is required."
    }),

  fees: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "Fees must be a valid number.",
      "number.min": "Fees cannot be negative.",
      "any.required": "Fees are required."
    }),

  isScholarshipApplied: Joi.boolean()
    .default(false)
    .messages({
      "boolean.base": "Scholarship status must be true or false."
    }),

  scholarshipNotAppliedReason: Joi.when("isScholarshipApplied", {
    is: false,
    then: Joi.string()
      .trim()
      .min(5)
      .required()
      .messages({
        "any.required": "Reason for not applying for scholarship is required when scholarship is not applied.",
        "string.min": "Reason for not applying for scholarship must be at least 5 characters long.",
        "string.empty": "Reason cannot be empty."
      }),
    otherwise: Joi.forbidden()
  }),

  academicYear: Joi.string()
    .trim()
    .pattern(/^\d{4}-\d{4}$/)
    .custom((value, helpers) => {
      const [start, end] = value.split("-").map(Number);
      if (end !== start + 1) {
        return helpers.message("Academic year must be in the format YYYY-YYYY with consecutive years.");
      }
      return value;
    })
    .required()
    .messages({
      "string.empty": "Academic year is required.",
      "string.pattern.base": "Academic year must be in the format YYYY-YYYY.",
      "any.required": "Academic year is required."
    }),

  isMahadbtFormSubmitted: Joi.boolean()
    .default(false)
    .messages({ "boolean.base": "MahaDBT status must be true or false." }),

  mahadbtFilledDate: Joi.when("isMahadbtFormSubmitted", {
    is: true,
    then: Joi.date().required().messages({
      "any.required": "MahaDBT form filled date is required.",
      "date.base": "MahaDBT form filled date must be a valid date."
    }),
    otherwise: Joi.forbidden()
  }),

  mahadbtNotFilledReason: Joi.when("isMahadbtFormSubmitted", {
    is: false,
    then: Joi.string()
      .trim()
      .min(5)
      .required()
      .messages({
        "any.required": "Reason is required if MahaDBT form is not submitted.",
        "string.min": "Reason must be at least 5 characters long.",
        "string.empty": "Reason cannot be empty."
      }),
    otherwise: Joi.forbidden()
  }),

  hasMigrationCertificate: Joi.boolean()
    .default(false)
    .messages({ "boolean.base": "Migration certificate status must be true or false." }),

  migrationExpectedDate: Joi.when("hasMigrationCertificate", {
    is: true,
    then: Joi.date().required().messages({
      "any.required": "Migration expected date is required.",
      "date.base": "Migration expected date must be a valid date."
    }),
    otherwise: Joi.forbidden()
  }),

  migrationNotAvailableReason: Joi.when("hasMigrationCertificate", {
    is: false,
    then: Joi.string()
      .trim()
      .min(5)
      .required()
      .messages({
        "any.required": "Reason is required if migration certificate is not available.",
        "string.min": "Reason must be at least 5 characters long.",
        "string.empty": "Reason cannot be empty."
      }),
    otherwise: Joi.forbidden()
  })
}).options({
  stripUnknown: true,
  convert: true,
  abortEarly: false
});

//update admission => student | pending only
const admissionUpdateSchema = Joi.object({
  year: Joi.string()
    .trim()
    .valid("FY", "SY", "TY")
    .optional()
    .messages({
      "any.only": "Year must be one of FY, SY, or TY.",
      "string.empty": "Year cannot be empty."
    }),

  div: Joi.string()
    .trim()
    .pattern(textWithNumberRegex)
    .max(10)
    .noProfanity()
    .optional()
    .messages({
      "string.pattern.base": "Division must contain only letters, numbers and allowed characters.",
      "string.noProfanity": "Division contains inappropriate language.",
      "string.empty": "Division cannot be empty."
    }),

  rollno: Joi.string()
    .trim()
    .pattern(/^\d+$/)
    .optional()
    .messages({
      "string.pattern.base": "Roll number must contain only digits.",
      "string.empty": "Roll number cannot be empty."
    }),

  course: Joi.string()
    .trim()
    .pattern(textWithNumberRegex)
    .min(2)
    .max(100)
    .noProfanity()
    .optional()
    .messages({
      "string.empty": "Course name cannot be empty.",
      "string.min": "Course name must be at least 2 characters long.",
      "string.max": "Course name cannot exceed 100 characters.",
      "string.pattern.base":
        "Course name must contain only letters, numbers, and special characters like commas, periods, exclamation marks, question marks, and hyphens.",
      "string.noProfanity": "Course name contains inappropriate language."
    }),

  fees: Joi.number()
    .min(0)
    .optional()
    .messages({
      "number.base": "Fees must be a valid number.",
      "number.min": "Fees cannot be negative."
    }),

  isScholarshipApplied: Joi.boolean()
    .optional()
    .messages({
      "boolean.base": "Scholarship status must be true or false."
    }),

  scholarshipNotAppliedReason: Joi.when("isScholarshipApplied", {
    is: false,
    then: Joi.string()
      .trim()
      .min(5)
      .required()
      .messages({
        "any.required": "Reason is required if scholarship is not applied.",
        "string.min": "Reason must be at least 5 characters long.",
        "string.empty": "Reason cannot be empty."
      }),
    otherwise: Joi.optional()
  }),

  isMahadbtFormSubmitted: Joi.boolean()
    .optional()
    .messages({ "boolean.base": "MahaDBT status must be true or false." }),

  mahadbtFilledDate: Joi.when("isMahadbtFormSubmitted", {
    is: true,
    then: Joi.date().required().messages({
      "any.required": "MahaDBT form filled date is required.",
      "date.base": "MahaDBT form filled date must be a valid date."
    }),
    otherwise: Joi.optional()
  }),

  mahadbtNotFilledReason: Joi.when("isMahadbtFormSubmitted", {
    is: false,
    then: Joi.string()
      .trim()
      .min(5)
      .required()
      .messages({
        "any.required": "Reason is required if MahaDBT form is not submitted.",
        "string.min": "Reason must be at least 5 characters long.",
        "string.empty": "Reason cannot be empty."
      }),
    otherwise: Joi.optional()
  }),

  hasMigrationCertificate: Joi.boolean()
    .optional()
    .messages({ "boolean.base": "Migration certificate status must be true or false." }),

  migrationExpectedDate: Joi.when("hasMigrationCertificate", {
    is: true,
    then: Joi.date().required().messages({
      "any.required": "Migration expected date is required.",
      "date.base": "Migration expected date must be a valid date."
    }),
    otherwise: Joi.optional()
  }),

  migrationNotAvailableReason: Joi.when("hasMigrationCertificate", {
    is: false,
    then: Joi.string()
      .trim()
      .min(5)
      .required()
      .messages({
        "any.required": "Reason is required if migration certificate is not available.",
        "string.min": "Reason must be at least 5 characters long.",
        "string.empty": "Reason cannot be empty."
      }),
    otherwise: Joi.optional()
  })
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update."
  })
  .options({
    stripUnknown: true,
    convert: true,
    abortEarly: false
  });


//update admission status => admin | DI
const admissionStatusSchema = Joi.object({
  status: Joi.string()
    .trim()
    .valid("approved", "rejected")
    .required()
    .messages({
      "any.required": "Status is required.",
      "any.only": "Please select a valid status.",
      "string.empty": "Status cannot be empty."
    })
}).options({
  stripUnknown: true,
  convert: true,
  abortEarly: false
});


//get all admissions => admin | DI
const getAdmissionsValidation = Joi.object({
  year: Joi.string()
    .trim()
    .valid("FY", "SY", "TY")
    .optional()
    .messages({
      "any.only": "Year must be one of FY, SY, or TY."
    }),

  academicYear: Joi.string()
    .trim()
    .pattern(/^\d{4}-\d{4}$/)
    .optional()
    .messages({
      "string.pattern.base": "Academic year must be in the format YYYY-YYYY."
    }),

  search: Joi.string()
    .trim()
    .pattern(textWithNumberRegex)
    .max(100)
    .optional()
    .messages({
      "string.max": "Search cannot exceed 100 characters.",
      "string.pattern.base":
        "Search must contain only letters, numbers, and special characters like commas, periods, exclamation marks, question marks, and hyphens."
    }),

  page: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages({
      "number.base": "Page must be a valid number.",
      "number.integer": "Page must be an integer.",
      "number.min": "Page must be at least 1."
    }),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
    .optional()
    .messages({
      "number.base": "Limit must be a valid number.",
      "number.integer": "Limit must be an integer.",
      "number.min": "Limit must be at least 1.",
      "number.max": "Limit cannot exceed 50."
    }),

  filterPaid: Joi.string()
    .trim()
    .valid("paid", "unpaid")
    .optional()
    .messages({
      "any.only": "Filter paid must be either 'paid' or 'unpaid'."
    }),

  status: Joi.string()
    .trim()
    .valid("pending", "approved", "rejected")
    .optional()
    .messages({
      "any.only": "Status must be one of pending, approved, or rejected."
    }),

  isScholarshipApplied: Joi.boolean()
    .optional()
    .messages({
      "boolean.base": "Scholarship applied must be true or false."
    }),

  isMahadbtFormSubmitted: Joi.boolean()
    .optional()
    .messages({
      "boolean.base": "MahaDBT form submitted must be true or false."
    }),

  hasMigrationCertificate: Joi.boolean()
    .optional()
    .messages({
      "boolean.base": "Migration certificate must be true or false."
    })
}).options({
  stripUnknown: true,
  convert: true,
  abortEarly: false
});


module.exports = {
  admissionCreateSchema,
  admissionUpdateSchema,
  admissionStatusSchema,
  getAdmissionsValidation,
};