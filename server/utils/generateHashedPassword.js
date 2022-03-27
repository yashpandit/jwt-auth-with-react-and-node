const bcrypt = require('bcrypt');

const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

module.exports = { generateHashedPassword };
