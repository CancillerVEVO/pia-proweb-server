const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  if (!(err instanceof AppError)) {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = errorHandler;
