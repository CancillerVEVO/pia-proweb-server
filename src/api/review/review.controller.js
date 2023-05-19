const {
  successResponse,
  noContentResponse,
  createdResponse,
} = require("../../handlers/ResponseHandler");
const {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  getAllReviews,
  getAllReviewsByMovie,
} = require("./review.handler");

const createReviewController = async ({ body, user }, res, next) => {
  try {
    const review = await createReview(body, parseInt(user));

    return createdResponse({ review }, "Reseña creada con exito!")(res);
  } catch (error) {
    next(error);
  }
};
const getAllReviewsController = async (req, res, next) => {
  try {
    const reviews = await getAllReviews();

    return successResponse({ reviews })(res);
  } catch (error) {
    next(error);
  }
};
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
const updateReviewController = async ({ body, params, user }, res, next) => {
  try {
    const review = await updateReview(
      parseInt(params.reviewId),
      body,
      parseInt(user)
    );
    return successResponse({ review })(res);
  } catch (error) {
    next(error);
  }
};
const deleteReviewController = async ({ user, params }, res, next) => {
  try {
    await deleteReview(parseInt(params.reviewId), parseInt(user));

    return noContentResponse("Reseña eliminada con exito!")(res);
  } catch (error) {
    next(error);
  }
};

const getAllReviewsByMovieController = async ({ params }, res, next) => {
  try {
    const reviews = await getAllReviewsByMovie(parseInt(params.movieId));

    return successResponse(reviews)(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReviewController,
  getAllReviewsController,
  getReviewByIdController,
  updateReviewController,
  deleteReviewController,
  getAllReviewsByMovieController,
};
