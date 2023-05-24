const express = require("express");
const checkJWT = require("../../middleware/session.middleware");
const {
  bodyCreateValidator,
  reviewParamValidator,
  bodyUpdateValidator,
  movieParamValidator,
} = require("./review.validator");

const {
  createReviewController,
  getAllReviewsController,
  getReviewByIdController,
  updateReviewController,
  deleteReviewController,
  getAllReviewsByMovieController,
} = require("./review.controller");

const router = express.Router();

router.post("/", checkJWT, bodyCreateValidator, createReviewController);
router.get("/", getAllReviewsController);
router.get(
  "/:reviewId",
  checkJWT,
  reviewParamValidator,
  getReviewByIdController
);
router.put(
  "/:reviewId",
  checkJWT,
  bodyUpdateValidator,
  reviewParamValidator,

  updateReviewController
);
router.delete(
  "/:reviewId",
  checkJWT,
  reviewParamValidator,
  deleteReviewController
);
router.get(
  "/movie/:movieId",
  movieParamValidator,
  getAllReviewsByMovieController
);

router.use("/", require("../favorites"));
router.use("/", require("../comments"));

module.exports = router;
