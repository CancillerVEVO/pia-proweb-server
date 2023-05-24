const { successResponse } = require("../../handlers/ResponseHandler");
const { createFavorite } = require("./favorites.handler");

const createFavoriteController = async ({ params, user }, res, next) => {
  try {
    const favorite = await createFavorite(
      Number(params.reviewId),
      Number(user)
    );

    return successResponse({ favorite }, "Favorito creado con exito!")(res);
  } catch (error) {
    next(error);
  }
};

const deleteFavoriteController = async (req, res, next) => {
  try {
    return successResponse({}, "Tambien yo")(res);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createFavoriteController,
  deleteFavoriteController,
};
