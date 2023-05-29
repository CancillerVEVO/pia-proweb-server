const express = require("express");
const {
  getAllCommentsController,
  deleteCommentController,
  updateCommentController,
} = require("./comments.controllers");
const {
  updateBodyValidator,
  createBodyValidator,
  paramValidator,
  reviewIdValidator,
} = require("./comments.validator");

const router = express.Router();

router.get("/comments", getAllCommentsController);
router.put(
  "/comments/:id",
  paramValidator,
  updateBodyValidator,
  updateCommentController
);
router.delete("/comments/:id", paramValidator, deleteCommentController);

module.exports = router;
