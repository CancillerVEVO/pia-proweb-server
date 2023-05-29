const { successResponse } = require("../../../handlers/ResponseHandler");
const {
  getAllComments,
  deleteComment,
  updateComment,
} = require("./comments.handlers");

const getAllCommentsController = async (req, res, next) => {
  try {
    const comments = await getAllComments();
    return successResponse({ comments }, "Comentarios obtenidos")(res);
  } catch (error) {
    next(error);
  }
};

const updateCommentController = async (req, res, next) => {
  try {
    const comment = await updateComment(Number(req.params.id), req.body);
    return successResponse({ comment }, "Comentario actualizado")(res);
  } catch (error) {
    next(error);
  }
};

const createCommentController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const deleteCommentController = async (req, res, next) => {
  try {
    await deleteComment(Number(req.params.id));
    return successResponse(null, "Comentario eliminado")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCommentsController,
  updateCommentController,
  deleteCommentController,
};
