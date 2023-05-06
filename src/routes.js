const express = require("express");
const router = express.Router();

router.use("/movies", require("./movies"));
router.use("/auth", require("./auth"));
router.use("/mock", require("./mock"));

module.exports = router;
