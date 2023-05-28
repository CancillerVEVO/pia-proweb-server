const { successResponse } = require("../../../handlers/ResponseHandler");
const { getAllReviews } = require("./reviews.handler");

const getAllReviewsController = async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    return successResponse(reviews, "Reviews obtenidas")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllReviewsController,
};
