const {
  successResponse,
  noContentResponse,
  createdResponse,
} = require("../../handlers/ResponseHandler");
const { createReview, getReviewById } = require("./review.handler");

const createReviewController = async ({ body, user }, res, next) => {
  try {
    const review = await createReview(body, parseInt(user));

    return createdResponse({ review }, "Review creada con exito!")(res);
  } catch (error) {
    next(error);
  }
};
const getAllReviewsController = async (req, res, next) => {};
const getReviewByIdController = async ({ params, user }, res, next) => {
  try {
    const review = await getReviewById(
      parseInt(params.reviewId),
      parseInt(user)
    );

    return successResponse(review)(res);
  } catch (error) {
    next(error);
  }
};
const updateReviewController = async (req, res, next) => {};
const deleteReviewController = async (req, res, next) => {};

module.exports = {
  createReviewController,
  getAllReviewsController,
  getReviewByIdController,
  updateReviewController,
  deleteReviewController,
};
