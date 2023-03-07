const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
  generateToken,
};

function generateToken(payload) {
  return jwt.sign(payload, "mysecret", {
    "expiresIn": 900
  });
}
