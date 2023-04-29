const express = require("express");
const router = express.Router();
const {
  getPopularMoviesController,
  getMovieDetailsController,
  searchMoviesController,
} = require("../controllers/movies.controller");

router.get("/", getPopularMoviesController);
router.get("/:movieId", getMovieDetailsController);
router.get("/search", searchMoviesController);

module.exports = router;
