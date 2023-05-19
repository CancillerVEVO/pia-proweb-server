const express = require("express");
const checkJWT = require("../../middleware/session.middleware");
const { bodyValidator, paramValidator } = require("./review.validator");
const {
  createReviewController,
  getAllReviewsController,
  getReviewByIdController,
  updateReviewController,
  deleteReviewController,
} = require("./review.controller");

const router = express.Router();

router.post("/", checkJWT, bodyValidator, createReviewController);
router.get("/", getAllReviewsController);
router.get("/:reviewId", checkJWT, paramValidator, getReviewByIdController);
router.put(
  "/:reviewId",
  checkJWT,
  paramValidator,
  bodyValidator,
  updateReviewController
);
router.delete("/:reviewId", checkJWT, paramValidator, deleteReviewController);

module.exports = router;
