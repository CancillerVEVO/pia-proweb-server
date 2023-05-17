const {
  JwtError,
  InvalidTokenError,
  TokenNotProvided,
} = require("../handlers/errors/JwtError");
const { AppError } = require("../handlers/errors/AppError");
const { TmdbError } = require("../handlers/errors/TmdbError");

const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  // TmdbError
  if (err instanceof TmdbError) {
    return res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }

  // AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // JwtError
  if (err instanceof JwtError) {
    let statusCode = 500;
    let message = "Ha ocurrido un error inesperado";
    let status = "error";

    switch (err.name) {
      case InvalidTokenError.name:
      case TokenNotProvided.name:
        statusCode = 401;
        message = err.message;
        break;
    }

    return res.status(statusCode).json({
      status,
      message,
    });
  }

  // Error
  res.status(500).json({
    status: "error",
    message: "Ha ocurrido un error inesperado",
  });
};

module.exports = errorHandler;
