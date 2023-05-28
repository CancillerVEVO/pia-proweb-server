const { getAllReviewsController } = require("./reviews.controller");

const express = require("express");
const router = express.Router();

router.get("/reviews", getAllReviewsController);
router.post("/reviews");
router.put("/reviews/:id");

module.exports = router;
