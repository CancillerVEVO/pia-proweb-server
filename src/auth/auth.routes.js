const express = require("express");
const { registerController, loginController } = require("./auth.controller");
const { registerValidator, loginValidator } = require("./auth.validator");

const router = express.Router();

router.post("/register", registerValidator, registerController);
router.post("/login", loginValidator, loginController);

module.exports = router;
