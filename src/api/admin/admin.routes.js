const checkJWT = require("../../middleware/session.middleware");
const {
  getAllUsersController,
  getAllCommentsController,
  getAllReviewsController,
} = require("./admin.controller");
const { isAdmin } = require("./admin.middleware");

const express = require("express");
const router = express.Router();

router.use(checkJWT);
router.use(isAdmin);

router.get("/users", getAllUsersController);
router.get("/reviews", getAllReviewsController);
router.get("/comments", getAllCommentsController);

module.exports = router;
