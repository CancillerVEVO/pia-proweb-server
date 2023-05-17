const bcrypt = require("bcrypt");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

const encrypt = async (password) => {
  const salt = await bcrypt.hash(password, SALT_ROUNDS);
  return salt;
};

const verify = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

module.exports = {
  encrypt,
  verify,
};
