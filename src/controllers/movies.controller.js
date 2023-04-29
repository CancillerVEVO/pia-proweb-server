const tmdb = require("../tmdb");

module.exports = {
  getPopularMoviesController: async (req, res) => {
    try {
      const movies = await tmdb.getPopularMovies({
        page: req.query.page ? req.query.page : 1,
      });
      res.status(200);
      res.json(movies);
    } catch (error) {
      res.status(
        error.response && error.response.status ? error.response.status : 500
      );
      res.json({ error: error.message });
    }
  },

  getMovieDetailsController: async (req, res) => {
    try {
      const movie = await tmdb.getMovieDetails({
        movieId: req.params.movieId,
      });
      res.status(200);
      res.json(movie);
    } catch (error) {
      res.status(
        error.response && error.response.status ? error.response.status : 500
      );
      res.json({ error: error.message });
    }
  },
  searchMoviesController: async (req, res) => {
    try {
      const movies = await tmdb.searchMovies({
        query: "Alien",
        page: req.query.page ? req.query.page : 1,
      });
      res.status(200);
      res.json(movies);
    } catch (error) {
      res.status(
        error.response && error.response.status ? error.response.status : 500
      );
      res.json({ error: error.message });
    }
  },
  getMovieByGenreController: async (req, res) => {},
};
