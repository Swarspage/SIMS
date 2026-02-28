
// Function to generate strong random password
const generateRandomPassword = (length = 14) => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "@$!%*?&";

  const allChars = uppercase + lowercase + numbers + special;

  // Ensure minimum 8 and max 14
  if (length < 8) length = 8;
  if (length > 14) length = 14;

  let password = "";

  // Guarantee at least one of each required type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill remaining characters randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle password to avoid predictable order
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
};

module.exports = generateRandomPassword;