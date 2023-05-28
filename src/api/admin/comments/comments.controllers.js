const { successResponse } = require("../../../handlers/ResponseHandler");
const { getAllComments } = require("./comments.handlers");

const getAllCommentsController = async (req, res, next) => {
  try {
    const comments = await getAllComments();
    return successResponse(comments, "Comentarios obtenidos")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCommentsController,
};
