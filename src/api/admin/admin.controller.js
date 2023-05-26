const { successResponse } = require("../../handlers/ResponseHandler");
const { getAllUsers, getAllComments, getAllReviews } = require("./handlers");

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return successResponse(users, "Usuarios obtenidos")(res);
  } catch (error) {
    next(error);
  }
};
const getAllReviewsController = async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    return successResponse(reviews, "Reviews obtenidas")(res);
  } catch (error) {
    next(error);
  }
};
const getAllCommentsController = async (req, res, next) => {
  try {
    const comments = await getAllComments();
    return successResponse(comments, "Comentarios obtenidos")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsersController,
  getAllReviewsController,
  getAllCommentsController,
};
