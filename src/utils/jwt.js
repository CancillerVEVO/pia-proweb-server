const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => {
  const token = jsonwebtoken.sign(payload, JWT_SECRET);
  return token;
};

const verifyToken = (token) => {
  const result = jsonwebtoken.verify(token, JWT_SECRET);
  return result;
};

module.exports = {
  generateToken,
  verifyToken,
};
