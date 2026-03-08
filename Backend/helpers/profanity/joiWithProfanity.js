// // utils/joiWithProfanity.js
// const Joi = require("joi");
// const profanity = require("./profanityFilter");

// const JoiExtended = Joi.extend((joi) => ({
//   type: "string",
//   base: joi.string(),
//   messages: {
//     "string.profanity": "{{#label}} contains inappropriate language."
//   },
//   rules: {
//     noProfanity: {
//       method() {
//         return this.$_addRule("noProfanity");
//       },
//       validate(value, helpers) {
//         if (profanity.check(value)) {
//           return helpers.error("string.profanity");
//         }
//         return value;
//       }
//     }
//   }
// }));

// module.exports = JoiExtended;


const Joi = require("joi");
const profanity = require("./profanityFilter");

const englishRegex = /^[A-Za-z0-9\s.,!?'"@()\-_:;/#]+$/; //to ensure only englissh language is accepted -no other language like hindi or marathi etc(because what if someone pastes bad words in hindi language?)

const JoiExtended = Joi.extend((joi) => ({
  type: "string",
  base: joi.string(),

  messages: {
    "string.profanity": "{{#label}} contains inappropriate language.",
    "string.englishOnly": "{{#label}} must contain only English characters."
  },

  rules: {

    englishOnly: {
      method() {
        return this.$_addRule("englishOnly");
      },
      validate(value, helpers) {

        if (!englishRegex.test(value)) {
          return helpers.error("string.englishOnly");
        }

        return value;
      }
    },

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