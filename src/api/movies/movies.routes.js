const {
  getPopularMoviesController,
  getMovieDetailsController,
  searchMoviesController,
  getMovieGenresController,
  getMoviesByGenreController,
} = require("./movies.controller");

const express = require("express");
const router = express.Router();

router.get("/", getPopularMoviesController);
router.get("/search", searchMoviesController);
router.get("/genres", getMovieGenresController);
router.get("/genre/:genreId", getMoviesByGenreController);
router.get("/:movieId", getMovieDetailsController);

module.exports = router;
