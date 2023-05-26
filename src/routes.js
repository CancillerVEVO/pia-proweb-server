const express = require("express");
const router = express.Router();

router.use("/movies", require("./api/movies"));
router.use("/auth", require("./api/auth"));
router.use("/review", require("./api/review"));
router.use("/profile", require("./api/profile"));

module.exports = router;
