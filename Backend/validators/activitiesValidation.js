// const Joi = require("joi");
const Joi = require("../helpers/profanity/joiWithProfanity");
const textWithNumberRegex = /^(?!\d+$)[A-Za-z0-9\s.,!?'-]+$/;

//create activity validation
const activityCreateSchema = Joi.object({
  title: Joi.string()
    .trim()
    .pattern(textWithNumberRegex)
    .min(3)
    .max(100)
    .noProfanity()
    .required()
    .messages({
      "string.base": "Title must be a string",
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title must not exceed 100 characters",
      "any.required": "Title is required",
      "string.pattern.base": "Title must contain only letters, numbers, and special characters like commas, periods, exclamation marks, question marks, and hyphens.",
      "string.noProfanity": "Title contains inappropriate language."
    }),

  description: Joi.string()
    .trim()
    .pattern(textWithNumberRegex)
    .min(5)
    .max(500)
    .noProfanity()
    .required()
    .messages({
      "string.empty": "Description is required",
      "string.min": "Description must be at least 5 characters",
      "string.max": "Description must not exceed 500 characters",
      "any.required": "Description is required",
      "string.pattern.base": "Description must contain only letters, numbers, and special characters like commas, periods, exclamation marks, question marks, and hyphens.",
      "string.noProfanity": "Description contains inappropriate language."
    }),

  // date: Joi.date()
  //   .required()
  //   .messages({
  //     "date.base": "Date must be a valid date",
  //     "any.required": "Date is required",
  //   }),
  date: Joi.object({
      from: Joi.date().required()
      .messages({
      "any.required" : "Start date is required.",
      "date.base" : "Start date must be a valid date."
    }),
  
      to: Joi.date().greater(Joi.ref("from")).required()            //ensures that end date > start date
      .messages({
      "any.required" : "End date is required.",
      "date.base" : "End date must be a valid date.",
      "date.greater" : "End date must be greater than start date."
    }),
  
    }).required()
    .messages({
        "any.required": "Date range is required."
    }),
}).unknown(false); //disallow fiels that are not defined in the schema

//update activity validation
const activityUpdateSchema = Joi.object({
  title: Joi.string()
    .trim()
    .pattern(textWithNumberRegex)
    .min(3)
    .max(100)
    .noProfanity()
    .messages({
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title must not exceed 100 characters",
      "string.pattern.base": "Title must contain only letters, numbers, and special characters like commas, periods, exclamation marks, question marks, and hyphens.",
      "string.noProfanity": "Title contains inappropriate language.",
    }),

  description: Joi.string()
    .trim()
    .pattern(textWithNumberRegex)
    .min(5)
    .max(500)
    .noProfanity()
    .messages({
      "string.min": "Description must be at least 5 characters",
      "string.max": "Description must not exceed 500 characters",
      "string.pattern.base": "Description must contain only letters, numbers, and special characters like commas, periods, exclamation marks, question marks, and hyphens.",
      "string.noProfanity": "Description contains inappropriate language.",
    }),

  date: Joi.object({
    from : Joi.date().messages({
      "date.base" : "Start date must be a valid date."
    }) , 
    // to : Joi.date().greater(Joi.ref("from")).messages({
    //   "date.base" : "End date must be a valid date.",
    //   "date.greater" : "End date must be greater than start date."
    // }) ,
    to : Joi.date().when("from" , {
      is : Joi.exist() ,
      then : Joi.date().greater(Joi.ref("from")).messages({
        "date.base" : "End date must be a valid date.",
        "date.greater" : "End date must be greater than start date."
    }),
      otherwise : Joi.date().messages({
        "date.base" : "End date must be a valid date."
      })
    }) ,
   }).min(1) ,         //atleast one of the date fields must be provided for update
})
.min(1)
.messages({
  "object.min": "At least one field is required to update",
}).unknown(false); //disallow fields that are not defined in the schema

module.exports = {
  activityCreateSchema,
  activityUpdateSchema,
};
