const express = require("express");
const {
  reviewParamValidator,
  commentParamValidator,
  bodyCreateValidator,
  bodyUpdateValidator,
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
  bodyCreateValidator,
  createCommentController
);

router.put(
  "/comments/:commentId",
  checkJWT,
  commentParamValidator,
  bodyUpdateValidator,
  updateCommentController
);

router.delete(
  "/comments/:commentId",
  checkJWT,
  commentParamValidator,
  deleteCommentController
);

router.get(
  "/:reviewId/comments/",
  reviewParamValidator,
  getAllCommentsController
);

router.get(
  "/comments/:commentId",
  commentParamValidator,
  getCommentByIdController
);

module.exports = router;
