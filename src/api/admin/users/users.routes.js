const {
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("./users.controllers");
const express = require("express");
const {
  paramValidator,
  updateBodyValidator,
  createBodyValidator,
} = require("./users.validator");
const router = express.Router();

router.get("/users", getAllUsersController);
router.post("/users", createBodyValidator, createUserController);
router.put(
  "/users/:id",
  paramValidator,
  updateBodyValidator,
  updateUserController
);
router.delete("/users/:id", paramValidator, deleteUserController);

module.exports = router;
