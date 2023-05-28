const {
  getAllReviewsController,
  createReviewController,
  deleteReviewController,
  updateReviewController,
} = require("./reviews.controller");
const {
  createBodyValidator,
  editBodyValidator,
  paramValidator,
} = require("./reviews.validator");
const express = require("express");

const router = express.Router();

router.get("/reviews", getAllReviewsController);
router.post("/reviews", createBodyValidator, createReviewController);
router.put(
  "/reviews/:id",
  paramValidator,
  editBodyValidator,
  updateReviewController
);
router.delete("/reviews/:id", paramValidator, deleteReviewController);

module.exports = router;
