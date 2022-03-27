require('dotenv').config();

const jwt = require('jsonwebtoken');

const verifyRefreshToken = (token, cb) => {
  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    cb);
};

module.exports = { verifyRefreshToken };
