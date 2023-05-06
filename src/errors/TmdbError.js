class TmdbError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.name = "TmdbError";
  }
}

class TmdbErrorFactory {
  static create(error) {
    if (error instanceof TmdbError) {
      return error;
    }

    if (error.response) {
      return new TmdbError(
        error.response.data.status_message || error.message,
        error.response.status || 500
      );
    }

    if (error instanceof Error) {
      return new TmdbError(error.message);
    }

    return new TmdbError("Error desconocido");
  }
}

module.exports = {
  TmdbError,
  TmdbErrorFactory,
};
