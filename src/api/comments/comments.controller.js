const {
  createdResponse,
  successResponse,
  noContentResponse,
} = require("../../handlers/ResponseHandler");
const {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
  getCommentById,
} = require("./comments.handler");

const createCommentController = async ({ params, body, user }, res, next) => {
  try {
    const comentario = await createComment(
      body,
      Number(params.reviewId),
      Number(user)
    );

    return createdResponse({ comentario }, "Comentario creado con exito!")(res);
  } catch (error) {
    next(error);
  }
};
const updateCommentController = async ({ params, body, user }, res, next) => {
  try {
    const comentario = await updateComment(
      body,
      Number(params.commentId),
      Number(user)
    );

    return successResponse({ comentario })(res);
  } catch (error) {
    next(error);
  }
};
const deleteCommentController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
const getAllCommentsController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
const getCommentByIdController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCommentController,
  updateCommentController,
  deleteCommentController,
  getAllCommentsController,
  getCommentByIdController,
};
