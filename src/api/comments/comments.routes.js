const express = require("express");
const checkJWT = require("../../middleware/session.middleware");
const {
  reviewParamValidator,
  commentParamValidator,
  bodyCreateValidator,
  bodyUpdateValidator,
} = require("./comments.validator");
const router = express.Router();

router.post(
  "/:reviewId/comments",
  checkJWT,
  reviewParamValidator,
  bodyCreateValidator
);
router.put(
  "/:reviewId/comments/:commentId",
  checkJWT,
  reviewParamValidator,
  commentParamValidator,
  bodyUpdateValidator
);
router.delete(
  "/:reviewId/comments/:commentId",
  checkJWT,
  reviewParamValidator,
  commentParamValidator
);
router.get("/:reviewId/comments", checkJWT, reviewParamValidator);
router.get(
  "/:reviewId/comments/:commentId",
  checkJWT,
  reviewParamValidator,
  commentParamValidator
);

module.exports = router;
