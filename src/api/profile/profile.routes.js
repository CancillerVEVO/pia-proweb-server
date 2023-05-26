const express = require("express");
const router = express.Router();
const checkJWT = require("../../middleware/session.middleware");
const {
  getProfile,
  getFavorites,
  updateProfile,
} = require("./profile.controller");

router.get("/", checkJWT, getProfile);
router.put("/", checkJWT, updateProfile);
router.get("/favorites", checkJWT, getFavorites);

module.exports = router;
