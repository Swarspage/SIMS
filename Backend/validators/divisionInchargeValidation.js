const Joi = require("joi");

const divisionInchargeLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


const importDivisionInchargeSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required(),

  year: Joi.string()
    .valid("SE", "TE", "BE")
    .required(),

  division: Joi.string()
    .valid("A", "B", "C")
    .required(),

  email: Joi.string()
    .email()
    .required()
});

module.exports = {
  importDivisionInchargeSchema, divisionInchargeLoginSchema
};
