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

const PER_PAGE = 10;

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
    const skip = req.query.page ? (Number(req.query.page) - 1) * PER_PAGE : 0;
    const reviews = await getAllReviews(skip, PER_PAGE);

    return successResponse(reviews)(res);
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

const getAllReviewsByMovieController = async ({ params, query }, res, next) => {
  try {
    const skipValue = query.page ? (Number(query.page) - 1) * PER_PAGE : 0;
    const reviews = await getAllReviewsByMovie(
      Number(params.movieId),
      skipValue,
      PER_PAGE
    );

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
