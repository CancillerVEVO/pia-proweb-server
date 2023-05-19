const express = require("express");
const checkJWT = require("../../middleware/session.middleware");
const {
  bodyCreateValidator,
  paramValidator,
  bodyUpdateValidator,
} = require("./review.validator");
const {
  createReviewController,
  getAllReviewsController,
  getReviewByIdController,
  updateReviewController,
  deleteReviewController,
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

module.exports = router;
