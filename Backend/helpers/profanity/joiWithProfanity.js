// utils/joiWithProfanity.js
const Joi = require("joi");
const profanity = require("./profanityFilter");

const JoiExtended = Joi.extend((joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.profanity": "{{#label}} contains inappropriate language."
  },
  rules: {
    noProfanity: {
      method() {
        return this.$_addRule("noProfanity");
      },
      validate(value, helpers) {
        if (profanity.check(value)) {
          return helpers.error("string.profanity");
        }
        return value;
      }
    }
  }
}));

module.exports = JoiExtended;