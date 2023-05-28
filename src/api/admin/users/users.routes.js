const { getAllUsersController } = require("./users.controllers");
const express = require("express");
const router = express.Router();

router.get("/users", getAllUsersController);
router.post("/users");
router.put("/users/:id");

module.exports = router;
