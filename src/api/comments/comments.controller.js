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
const deleteCommentController = async ({ params, user }, res, next) => {
  try {
    await deleteComment(Number(params.commentId), Number(user));

    return noContentResponse("Comentario eliminado con exito!")(res);
  } catch (error) {
    next(error);
  }
};

const getCommentByIdController = async ({ params }, res, next) => {
  try {
    const comentario = await getCommentById(Number(params.commentId));

    return successResponse({ comentario })(res);
  } catch (error) {
    next(error);
  }
};
const getAllCommentsController = async ({ params }, res, next) => {
  try {
    const comentarios = await getAllComments(Number(params.reviewId));

    return successResponse({ comentarios })(res);
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
