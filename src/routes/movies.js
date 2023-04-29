const express = require("express");
const router = express.Router();
const {
  getPopularMoviesController,
  getMovieDetailsController,
  searchMoviesController,
  getMovieGenresController,
  getMoviesByGenreController,
} = require("../controllers/movies.controller");

router.get("/", getPopularMoviesController);
router.get("/search", searchMoviesController);
router.get("/genres", getMovieGenresController);
router.get("/genre/:genreId", getMoviesByGenreController);
router.get("/:movieId", getMovieDetailsController);

module.exports = router;
