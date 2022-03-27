require('dotenv').config();

const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = { generateAccessToken, generateRefreshToken };
