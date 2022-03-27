const { verifyAccessToken } = require('../utils/verifyTokens');
const { AUTHORIZATION_HEADER } = require('../constants');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers[AUTHORIZATION_HEADER];
  // the general format of authorization header is
  // BEARER <TOKEN>, so we want to split the header
  // and get the second value to read the token
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401);
  }

  verifyAccessToken(
    token,
    (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
  });
};

module.exports = { authenticateToken };
