// utils/profanityFilter.js
const LeoProfanity = require("leo-profanity");

LeoProfanity.loadDictionary("en"); // load default english list

// Add custom words (Indian + common internet profanity) --generated from chatGPT
LeoProfanity.add([
  // Hindi / Hinglish abuses
  "behenchod","bhenchod","behench*d","bc",
  "madarchod","madrchod","mc",
  "chutiya","chutya","chutiyapa",
  "bhosdike","bhosdi","bhosadi","bhosda",
  "randi","randwa","rand",
  "haramkhor","harami",
  "kameena","kamina",
  "kutte","kutta","kutti",
  "saala","saale","saali",
  "launde","lauda","lund","loda",
  "gaand","gandu","gaandmar",
  "bkl","bakchod","bakchodi",
  "jhatu","jhaatu",
  "tatti","tattiya",
  "bawaseer",
  "chakka",
  "bhen ke lode","behen ke lode",
  "maa ke lode",
  "teri maa ki",
  "teri behen ki",

  // English profanity
  "fuck","f*ck","fucking","fucker",
  "shit","bullshit","shithead",
  "ass","asshole",
  "bitch","bitches",
  "bastard",
  "dick","dickhead",
  "pussy",
  "slut",
  "whore",
  "porn",
  "sex","s*x","sexy",
  "nude","nudes","naked",
  "blowjob","handjob",
  "cum","cumming",
  "rape","rapist",
  "kill","killer","murder",
  "suicide",
  "terrorist","terrorism",
  "bomb","bombing","explosive",

  // Drugs
  "cocaine",
  "heroin",
  "weed",
  "ganja",
  "charas",
  "hashish",
  "lsd",
  "meth",
  "mdma",
  "ecstasy",
  "drugs",
  "drugdealer",
  "drug dealer",

  // Internet slang toxic words
  "wtf",
  "stfu",
  "dafuq",
  "fk",
  "fck",
  "idiot",
  "moron",
  "retard",
  "loser",
  "dumbass",
  "dipshit"
]);

module.exports = LeoProfanity;

module.exports = LeoProfanity;