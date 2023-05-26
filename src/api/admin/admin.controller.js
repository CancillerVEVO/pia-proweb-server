const { successResponse } = require("../../handlers/ResponseHandler");

const getAllUsersController = async (req, res, next) => {
  try {
    res.send("getAllUsersController");
  } catch (error) {
    next(error);
  }
};
const getAllReviewsController = async (req, res, next) => {
  try {
    res.send("getAllReviewsController");
  } catch (error) {
    next(error);
  }
};
const getAllCommentsController = async (req, res, next) => {
  try {
    res.send("getAllCommentsController");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsersController,
  getAllReviewsController,
  getAllCommentsController,
};
