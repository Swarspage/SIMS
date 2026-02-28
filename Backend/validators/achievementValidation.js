const Joi = require("joi");

const baseAchievementSchema = {
  category: Joi.string()
    .valid(
      "Coding competitions",
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

  title: Joi.string().min(3).max(100).required()
  .messages({
    "string.empty" : "Title is required.",
    "string.min" : "Title must be at least 3 characters long.",
    "string.max" : "Title cannot exceed 100 characters." , 
    "any.required" : "Title is required."
  }),

  description: Joi.string().min(10).max(500).required()
  .messages({
    "string.empty" : "Description is required.",
    "string.min" : "Description must be at least 10 characters long.",
    "string.max" : "Description cannot exceed 500 characters." , 
    "any.required" : "Description is required."
  }),

  issuedBy: Joi.string().min(3).max(100).required()
  .messages({
    "string.empty" : "Issued by is required.",
    "string.min" : "Issued by must be at least 3 characters long.",
    "string.max" : "Issued by cannot exceed 100 characters." , 
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

  teamMembers: Joi.array().items(Joi.string().messages({"string.base" : "Each team member name must be a string."})).default([]).messages({"array.base" : "Team members must be an array."}),

  certification_course: Joi.string()
    .trim()
    .max(500)
    .allow("")
    .optional()
    .messages({
      "string.max": "Certification/Course details cannot exceed 500 characters.",
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
