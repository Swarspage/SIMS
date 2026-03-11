// utils/profanityFilter.js
const LeoProfanity = require("leo-profanity");

LeoProfanity.loadDictionary("en");

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


// normalize text to catch tricks
function normalizeText(text) {

  return text
    .toLowerCase()

    // remove spaces between characters
    .replace(/\s+/g, "")

    // remove punctuation
    .replace(/[._\-*@#!$%^&()+=]/g, "")

    // convert numbers to letters
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t");
}

function containsProfanity(text) {

  if (!text) return false;

  const words = text.toLowerCase().split(/\W+/);

  for (const w of words) {
    if (LeoProfanity.check(w)) {
      return true;
    }
  }

  const normalized = normalizeText(text);
  const badWords = LeoProfanity.list();

  for (const word of badWords) {
    if (normalized.includes(word)) {
      return true;
    }
  }

  return false;
}

module.exports = {
  check: containsProfanity
};