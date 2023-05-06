const { verifyToken } = require("../utils/jwt");

const checkJWT = async (req, _, next) => {
  try {
    const { authorization = "" } = req.headers;
    const token = authorization.split(" ")[1];

    const payload = verifyToken(token);

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkJWT;
