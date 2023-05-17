const express = require("express");
const checkJWT = require("../middleware/session.middleware");
const {
  registerController,
  loginController,
  meController,
} = require("./auth.controller");
const { registerValidator, loginValidator } = require("./auth.validator");

const router = express.Router();

router.post("/register", registerValidator, registerController);
router.post("/login", loginValidator, loginController);
router.get("/me", checkJWT, meController);

module.exports = router;
