const { JsonWebTokenError } = require("jsonwebtoken");

class JwtError extends Error {
  constructor(message) {
    super(message);
    this.name = "JwtError";
  }
}

class InvalidTokenError extends JwtError {
  constructor({ message = "El token no es válido", token = null }) {
    super(message);
    this.token = token;
    this.name = "InvalidTokenError";
  }
}

class TokenNotProvided extends JwtError {
  constructor(message = "El token no fue proporcionado") {
    super(message);
    this.name = "TokenNotProvided";
  }
}

class JwtErrorFactory {
  static create(error) {
    if (error instanceof JwtError) {
      return error;
    }

    if (error instanceof JsonWebTokenError) {
      switch (error.message) {
        case "invalid signature":
        case "jwt malformed":
          return new InvalidTokenError({ token: error.token });
        case "jwt must be provided":
          return new TokenNotProvided();
      }

      return new JwtError(error.message);
    }

    if (error instanceof Error) {
      return new JwtError(error.message);
    }

    return new JwtError("Error desconocido");
  }
}

module.exports = {
  JwtError,
  InvalidTokenError,
  TokenNotProvided,
  JwtErrorFactory,
};
