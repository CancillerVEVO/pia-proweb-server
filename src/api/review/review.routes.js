const express = require("express");
const checkJWT = require("../../middleware/session.middleware");
const {
  bodyCreateValidator,
  paramValidator,
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
router.get("/:reviewId", checkJWT, paramValidator, getReviewByIdController);
router.put(
  "/:reviewId",
  checkJWT,
  bodyUpdateValidator,
  paramValidator,

  updateReviewController
);
router.delete("/:reviewId", checkJWT, paramValidator, deleteReviewController);
router.get(
  "/movie/:movieId",
  movieParamValidator,
  getAllReviewsByMovieController
);

/* router.use("/:reviewId/comments", require("../comment/comment.routes")); */

module.exports = router;
