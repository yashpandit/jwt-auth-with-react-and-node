require('dotenv').config();

const jwt = require('jsonwebtoken');

const verifyToken = (token, secret, cb) => {
  jwt.verify(token, secret, cb);
};

module.exports = { verifyToken };
