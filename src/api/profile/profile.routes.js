const express = require("express");
const router = express.Router();
const { updateProfileValidator } = require("./profile.validator");
const checkJWT = require("../../middleware/session.middleware");
const {
  getProfileController,
  getFavoritesController,
  updateProfileController,
} = require("./profile.controller");

router.get("/", checkJWT, getProfileController);
router.put("/", checkJWT, updateProfileValidator, updateProfileController);
router.get("/favorites", checkJWT, getFavoritesController);

module.exports = router;
