const tmdb = require("../tmdb");
const AppError = require("../utils/AppError");

module.exports = {
  getPopularMoviesController: async (req, res, next) => {
    try {
      const movies = await tmdb.getPopularMovies({
        page: req.query.page ? parseInt(req.query.page) : 1,
      });
      res.status(200);
      res.json(movies);
    } catch (error) {
      next(AppError.handleAxiosError(error));
    }
  },

  getMovieDetailsController: async (req, res, next) => {
    try {
      const movie = await tmdb.getMovieDetails({
        movieId: req.params.movieId,
      });

      res.status(200);
      res.json(movie);
    } catch (error) {
      next(AppError.handleAxiosError(error));
    }
  },
  searchMoviesController: async (req, res, next) => {
    try {
      const movies = await tmdb.searchMovies({
        query: req.query.name,
        page: req.query.page ? req.query.page : 1,
      });
      res.status(200);
      res.json(movies);
    } catch (error) {
      next(AppError.handleAxiosError(error));
    }
  },
  getMovieGenresController: async (req, res, next) => {
    try {
      const genres = await tmdb.getMovieGenres();

      res.status(200);
      res.json(genres);
    } catch (error) {
      next(AppError.handleAxiosError(error));
    }
  },
  getMoviesByGenreController: async (req, res, next) => {
    try {
      const movies = await tmdb.getMovieByGenre({
        genreId: req.params.genreId ? req.params.genreId : 28,
        page: req.query.page ? req.query.page : 1,
      });

      res.status(200);
      res.json(movies);
    } catch (error) {
      next(AppError.handleAxiosError(error));
    }
  },
};
