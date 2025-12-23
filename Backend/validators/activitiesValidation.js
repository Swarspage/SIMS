const Joi = require("joi");

//create activity validation
const activityCreateSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Title must be a string",
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title must not exceed 100 characters",
      "any.required": "Title is required",
    }),

  description: Joi.string()
    .min(5)
    .max(500)
    .required()
    .messages({
      "string.empty": "Description is required",
      "string.min": "Description must be at least 5 characters",
      "string.max": "Description must not exceed 500 characters",
      "any.required": "Description is required",
    }),

  date: Joi.date()
    .required()
    .messages({
      "date.base": "Date must be a valid date",
      "any.required": "Date is required",
    }),
});

//update activity validation
const activityUpdateSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .messages({
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title must not exceed 100 characters",
    }),

  description: Joi.string()
    .min(5)
    .max(500)
    .messages({
      "string.min": "Description must be at least 5 characters",
      "string.max": "Description must not exceed 500 characters",
    }),

  date: Joi.date()
    .messages({
      "date.base": "Date must be a valid date",
    }),
})
.min(1)
.messages({
  "object.min": "At least one field is required to update",
});

module.exports = {
  activityCreateSchema,
  activityUpdateSchema,
};
