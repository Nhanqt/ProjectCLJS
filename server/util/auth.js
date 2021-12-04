const jwt = require("jsonwebtoken");
const config = require("../config/auth");

module.exports.generateAccessToken = (user) => {
  return jwt.sign(user, config.access_token_secret, {
    expiresIn: 60 * 60 * 72,
  });
};
