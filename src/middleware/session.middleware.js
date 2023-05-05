const AppError = require("../utils/AppError");
const { verifyToken } = require("../utils/jwt");

const checkJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new AppError.unauthorized(
        "No se ha enviado un token de autorización"
      );
    }

    const payload = verifyToken(token);

    req.user = payload;
    next();
  } catch (error) {
    throw new AppError.unauthorized(
      "No se ha podido verificar el token de autorización"
    );
  }
};

module.exports = checkJWT;
