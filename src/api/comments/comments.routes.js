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
const checkJWT = require("../../middleware/session.middleware");
const router = express.Router();

router.post(
  "/:reviewId/comments/",
  checkJWT,
  reviewParamValidator,
  createCommentController
);

router.put(
  "/:reviewId/comments/:commentId",
  checkJWT,
  reviewParamValidator,
  commentParamValidator,
  updateCommentController
);

router.delete(
  "/:reviewId/comments/:commentId",
  checkJWT,
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
