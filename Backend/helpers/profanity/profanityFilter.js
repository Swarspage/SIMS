// utils/profanityFilter.js
const LeoProfanity = require("leo-profanity");

LeoProfanity.loadDictionary("en");

// weak words (can appear inside normal English words)
const weakWords = new Set(["ass","sex","cum"]);

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


// get all bad words from leo-profanity dictionary
const badWords = LeoProfanity.list();

// normalize text to catch tricks
function normalizeText(text) {

  return text
    .toLowerCase()

    // remove spaces between characters
    .replace(/\s+/g, "")

    // convert symbols to letters
    .replace(/@/g, "a")
    .replace(/\$/g, "s")
    .replace(/!/g, "i")
    .replace(/\|/g, "i")

    // convert numbers to letters
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")

    // remove separators
    .replace(/[\s._\-*@#!$%^&()+=/\\]/g, "")

    // collapse repeated letters
    // beeeeehenchood -> behenchod
    .replace(/(.)\1+/g, "$1");
}


function containsProfanity(text) {

  // remove leading and trailing spaces
  // prevents cases like "   fuck   "
  text = text.trim();
  
  // if text is empty after trimming, nothing to check
  if (!text) return false;


  // so that cases like -  f  u   c   k   - are detected
  const normalizedFullText = normalizeText(text);
  if (LeoProfanity.check(normalizedFullText)) {
    return true;
  }

  // split the input text into individual words
  // separators include spaces and common punctuation
  // example: "hello fuck@world" -> ["hello", "fuck", "world"]
  const words = text
    .toLowerCase()
    .split(/[\s.,!?@#\-_/()]+/)
    .filter(Boolean);

  // check each word separately
  for (const w of words) {

    // direct profanity check on the original word
    // catches simple cases like "fuck", "shit", etc.
    if (LeoProfanity.check(w)) {
      return true;
    }

    // normalize the word to detect disguised profanity
    // example transformations:
    // f*ck -> fuck
    // f@ck -> fack
    // b-h-e-n-c-h-o-d -> behenchod
    // fuuuuuck -> fuck
    const normalizedWord = normalizeText(w);

    // check again after normalization
    // catches tricks like "f*ck", "f@ck", "b-h-e-n-c-h-o-d"
    if (LeoProfanity.check(normalizedWord)) {
      return true;
    }

    // advanced detection logic:
    // differentiate between weak and strong profanity words
    // weak words (ass, sex, cum) appear inside normal English words
    // example: assignment, class, cumulative
    // so we avoid substring detection for them

    for (const badWord of badWords) {

      if (weakWords.has(badWord)) {

        // weak words → allow only exact matches
        // prevents false positives like:
        // assignment (contains "ass")
        // class (contains "ass")
        if (normalizedWord === badWord) {
          return true;
        }

      } else {

        // strong words → allow substring detection
        // catches cases like:
        // fuck123
        // 123fuckabc
        // behenchodxyz
        if (badWord.length >= 4 && normalizedWord.includes(badWord)) {
          return true;
        }

      }

    }

  }

  // if no profanity detected in any word
  return false;
}

module.exports = {
  check: containsProfanity
};




