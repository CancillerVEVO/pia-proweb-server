const express = require("express");
const { mockController } = require("./mock.controller");
const checkJWT = require("../middleware/session.middleware");
const router = express.Router();

router.get("/", checkJWT, mockController);

module.exports = router;
