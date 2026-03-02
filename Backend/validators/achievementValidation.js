// const Joi = require("joi");
const Joi = require("../helpers/profanity/joiWithProfanity");

const textWithNumberRegex = /^(?!\d+$)[A-Za-z0-9\s.,!?'-]+$/;
const textOnlyRegex = /^[A-Za-z\s'-]+$/;

const baseAchievementSchema = {
  category: Joi.string()
    .valid(
      "Coding competitions",
      "Academic Topper",
      "Committee",
      "Hackathon",
      "Sports",
      "Cultural",
      "Technical",
      "Other"
    )
    .required()
    .messages({
      "any.required" : "Category is required.",
      "any.only" : "Please select a valid category."
    }),

  title: Joi.string().trim().pattern(textWithNumberRegex).min(3).max(100).noProfanity().required()
  .messages({
    "string.empty" : "Title is required.",
    "string.pattern.base" : "Title must contain only letters, numbers, and special characters like commas, periods, exclamation marks, question marks, and hyphens.",
    "string.min" : "Title must be at least 3 characters long.",
    "string.max" : "Title cannot exceed 100 characters." , 
    "string.noProfanity" : "Title contains inappropriate language.",
    "any.required" : "Title is required."
  }),

  description: Joi.string().trim().pattern(textWithNumberRegex).min(10).max(500).noProfanity().required()
  .messages({
    "string.empty" : "Description is required.",
    "string.pattern.base" : "Description must contain only letters, numbers, and special characters like commas, periods, exclamation marks, question marks, and hyphens.",
    "string.min" : "Description must be at least 10 characters long.",
    "string.max" : "Description cannot exceed 500 characters." , 
    "string.noProfanity" : "Description contains inappropriate language.",
    "any.required" : "Description is required."
  }),

  issuedBy: Joi.string().trim().pattern(textWithNumberRegex).min(3).max(100).noProfanity().required()
  .messages({
    "string.empty" : "Issued by is required.",
    "string.pattern.base" : "Issued by must contain only letters, numbers, and special characters like commas, periods, exclamation marks, question marks, and hyphens.",
    "string.min" : "Issued by must be at least 3 characters long.",
    "string.max" : "Issued by cannot exceed 100 characters." , 
    "string.noProfanity" : "Issued by contains inappropriate language.",
    "any.required" : "Issued by is required."
  }),

  date: Joi.object({
    from: Joi.date().required()
    .messages({
    "any.required" : "Start date is required.",
    "date.base" : "Start date must be a valid date."
  }),

    to: Joi.date().required()
    .messages({
    "any.required" : "End date is required.",
    "date.base" : "End date must be a valid date."
  }),

  }).required()
  .messages({
      "any.required": "Date range is required."
  }),

  achievementType: Joi.string()
    .valid("Participation", "Winner", "Runner-up")
    .required()
    .messages({
      "any.required" : "Achievement type is required.",
      "any.only" : "Please select a valid achievement type."
    }),

  
  teamMembers: Joi.array()
  .items(
    Joi.string()
      .trim()
      .pattern(textOnlyRegex)
      .min(2)
      .messages({
        "string.pattern.base":
          "Each team member name must contain only letters.",
        "string.min":
          "Each team member name must be at least 2 characters long.",
      })
  )
  .default([])
  .messages({
    "array.base": "Team members must be an array."
  }),

  certification_course: Joi.string()
    .trim()
    .max(500)
    .noProfanity()
    .allow("")
    .optional()
    .messages({
      "string.max": "Certification/Course details cannot exceed 500 characters.",
      "string.noProfanity": "Certification/Course details contains inappropriate language.",
    }),
};

//create a base schema without required fields for update validation
const createAchievementSchema = Joi.object(baseAchievementSchema);


const updateAchievementSchema = Joi.object(
  Object.fromEntries(
    Object.entries(baseAchievementSchema).map(([key, schema]) => [
      key,
      schema.optional(),
    ])
  )
);


module.exports = { createAchievementSchema , updateAchievementSchema };
