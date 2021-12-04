const bcrypt = require("bcryptjs");

module.exports.checkHashString = (plaintext, hashedString) => {
  const isMatched = bcrypt.compareSync(plaintext, hashedString);
  return isMatched;
};

module.exports.generateHashString = (plaintext) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plaintext, salt);
  return hash;
};
