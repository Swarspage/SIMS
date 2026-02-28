// utils/profanityFilter.js
const LeoProfanity = require("leo-profanity");

LeoProfanity.loadDictionary("en"); // load default english list

// Add your custom words
LeoProfanity.add([
  "behenchod", "madarchod", "chutiya", "bhosdike", "randi", "bhosdi",
  "cocaine", "heroin", "weed", "drugs", "bomb", "kill"
]);

module.exports = LeoProfanity;