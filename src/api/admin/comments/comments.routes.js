const express = require("express");
const { getAllCommentsController } = require("./comments.controllers");

const router = express.Router();

router.get("/comments", getAllCommentsController);
router.post("/comments");
router.put("/comments/:id");

module.exports = router;
