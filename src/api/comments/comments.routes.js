const express = require("express");
const {
  reviewParamValidator,
  commentParamValidator,
} = require("./comments.validator");
const {
  createCommentController,
  updateCommentController,
  deleteCommentController,
  getAllCommentsController,
  getCommentByIdController,
} = require("./comments.controller");
const router = express.Router();

router.post(
  "/:reviewId/comments/",
  reviewParamValidator,
  createCommentController
);

router.put(
  "/:reviewId/comments/:commentId",
  reviewParamValidator,
  commentParamValidator,
  updateCommentController
);

router.delete(
  "/:reviewId/comments/:commentId",
  reviewParamValidator,
  commentParamValidator,
  deleteCommentController
);

router.get(
  "/:reviewId/comments/",
  reviewParamValidator,
  getAllCommentsController
);

router.get(
  "/:reviewId/comments/:commentId",
  reviewParamValidator,
  commentParamValidator,
  getCommentByIdController
);

module.exports = router;
