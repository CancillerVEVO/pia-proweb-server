const jsonwebtoken = require("jsonwebtoken");
const { JwtErrorFactory } = require("../../../handlers/errors/JwtError");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload, secret = JWT_SECRET) => {
  try {
    const token = jsonwebtoken.sign(payload, secret);
    return token;
  } catch (error) {
    throw JwtErrorFactory.create(error);
  }
};
const verifyToken = (token, secret = JWT_SECRET) => {
  try {
    const result = jsonwebtoken.verify(token, secret);
    return result;
  } catch (error) {
    throw JwtErrorFactory.create(error);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
