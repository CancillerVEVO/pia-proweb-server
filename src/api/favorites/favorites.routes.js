const express = require("express");
const router = express.Router();
const checkJWT = require("../../middleware/session.middleware");
const { reviewParamValidator } = require("./favorites.validator");
const {
  createFavoriteController,
  deleteFavoriteController,
} = require("./favorites.controller");

router.post(
  "/:reviewId/favorites",
  checkJWT,
  reviewParamValidator,
  createFavoriteController
);
router.delete(
  "/:reviewId/favorites",
  checkJWT,
  reviewParamValidator,
  deleteFavoriteController
);

module.exports = router;
