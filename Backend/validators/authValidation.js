const Joi = require("joi");

//signup
const signupSchema = Joi.object({
  studentID: Joi.string()
    .trim()
    .pattern(/^[0-9]{4}[A-Z]{4}[0-9]{3}$/)
    .required()
    .messages({
      "string.empty": "Student ID is required.",
      "string.pattern.base":
        "Student ID must follow format: 4 digits + 4 uppercase letters + 3 digits.",
      "any.required": "Student ID is required."
    }),

  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Enter a valid email.",
      "any.required": "Email is required."
    }),

  password: Joi.string()
    .trim()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]{8,14}$/)
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must be 8-14 characters and include uppercase, lowercase, number and special character.",
      "any.required": "Password is required."
    })
}).options({
  stripUnknown: true,
  convert: true,
  abortEarly: false
});

//student login
const loginSchema = Joi.object({
  studentID: Joi.string()
    .trim()
    .pattern(/^[0-9]{4}[A-Z]{4}[0-9]{3}$/)
    .required()
    .messages({
      "string.empty": "Student ID is required.",
      "string.pattern.base": "Invalid Student ID format.",
      "any.required": "Student ID is required."
    }),

  password: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Password is required.",
      "any.required": "Password is required."
    })
}).options({
  stripUnknown: true,
  convert: true,
  abortEarly: false
});

//admin login 
const adminLoginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Enter a valid email.",
      "any.required": "Email is required."
    }),

  password: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Password is required.",
      "any.required": "Password is required."
    })
}).options({
  stripUnknown: true,
  convert: true,
  abortEarly: false
});

//division incharge login
const divisionInchargeLoginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Enter a valid email.",
      "any.required": "Email is required."
    }),

  password: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Password is required.",
      "any.required": "Password is required."
    })
}).options({
  stripUnknown: true,
  convert: true,
  abortEarly: false
});

//forgot password
const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Enter a valid email address.",
      "any.required": "Email is required."
    })
}).options({
  stripUnknown: true,
  convert: true,
  abortEarly: false
});

//reset password
const resetPasswordSchema = Joi.object({
  newPassword: Joi.string()
    .trim()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]{8,14}$/)
    .required()
    .messages({
      "string.empty": "New password is required.",
      "string.pattern.base":
        "Password must be 8-14 characters with uppercase, lowercase, number and special character.",
      "any.required": "New password is required."
    })
}).options({
  stripUnknown: true,
  convert: true,
  abortEarly: false
});

module.exports = {
  signupSchema,
  loginSchema,
  adminLoginSchema,
  divisionInchargeLoginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
};