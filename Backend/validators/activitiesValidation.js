const Joi = require("joi");

const activityCreateSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .message("Title is required and must be 3-100 characters"),

  description: Joi.string()
    .min(5)
    .max(500)
    .required()
    .message("Description is required and must be 5-500 characters"),

  date: Joi.date()
    .required()
    .message("Date is required and must be valid"),
});


const activityUpdateSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .optional()
    .message("Title must be 3-100 characters if provided"),

  description: Joi.string()
    .min(5)
    .max(500)
    .optional()
    .message("Description must be 5-500 characters if provided"),

  date: Joi.date()
    .optional()
    .message("Date must be valid if provided"),
})
  .min(1)
  .message("At least one field is required to update");

module.exports = {
  activityCreateSchema,
  activityUpdateSchema,
};
