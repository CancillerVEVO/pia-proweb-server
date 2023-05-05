class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  static handleAxiosError(error) {
    console.log(error);
    const message = error.response.data.status_message || error.message;
    const statusCode = error.response.status || 500;

    return new AppError(message, statusCode);
  }

  static badRequest(message) {
    return new AppError(message || "Petición incorrecta", 400);
  }

  static unauthorized(message) {
    return new AppError(message || "No autorizado", 401);
  }

  static forbidden(message) {
    return new AppError(message || "Prohibido", 403);
  }

  static notFound(message) {
    return new AppError(message || "No encontrado", 404);
  }
}

module.exports = AppError;
