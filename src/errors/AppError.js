class AppError extends Error {
  constructor(message, statusCode, error = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.error = error;

    Error.captureStackTrace(this, this.constructor);
  }

  static create(message, statusCode, error = null) {
    return new AppError(message, statusCode, error);
  }
}

class UnauthorizedError extends AppError {
  constructor(message, error = null) {
    super(message || "No autorizado", 401, error);
  }

  static create(message, error = null) {
    return new UnauthorizedError(message, error);
  }
}

class ForbiddenError extends AppError {
  constructor(message, error = null) {
    super(message || "Prohibido", 403, error);
  }

  static create(message, error = null) {
    return new ForbiddenError(message, error);
  }
}

class NotFoundError extends AppError {
  constructor(message, error = null) {
    super(message || "No encontrado", 404, error);
  }

  static create(message, error = null) {
    return new NotFoundError(message, error);
  }
}

class BadRequestError extends AppError {
  constructor(message, error = null) {
    super(message || "Petición incorrecta", 400, error);
  }

  static create(message, error = null) {
    return new BadRequestError(message, error);
  }
}

module.exports = {
  AppError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  BadRequestError,
};
