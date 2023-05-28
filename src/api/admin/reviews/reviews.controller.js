const {
  successResponse,
  noContentResponse,
} = require("../../../handlers/ResponseHandler");
const {
  getAllReviews,
  createReview,
  deleteReview,
  editReview,
} = require("./reviews.handler");

const getAllReviewsController = async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    return successResponse({ reviews }, "Reviews obtenidas")(res);
  } catch (error) {
    next(error);
  }
};
const updateReviewController = async ({ params, body }, res, next) => {
  try {
    const review = await editReview(Number(params.id), body);
    return successResponse({ review }, "Review actualizada")(res);
  } catch (error) {
    next(error);
  }
};

const deleteReviewController = async ({ params }, res, next) => {
  try {
    await deleteReview(Number(params.id));
    return noContentResponse("Review eliminada")(res);
  } catch (error) {
    next(error);
  }
};

const createReviewController = async ({ body }, res, next) => {
  try {
    const review = await createReview(body);
    return successResponse({ review }, "Review creada")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllReviewsController,
  updateReviewController,
  deleteReviewController,
  createReviewController,
};
