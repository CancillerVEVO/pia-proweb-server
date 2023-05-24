const {
  successResponse,
  noContentResponse,
} = require("../../handlers/ResponseHandler");
const { createFavorite, deleteFavorite } = require("./favorites.handler");

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

const deleteFavoriteController = async ({ params, user }, res, next) => {
  try {
    await deleteFavorite(Number(params.reviewId), Number(user));

    return noContentResponse("Favorito eliminado con exito!")(res);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createFavoriteController,
  deleteFavoriteController,
};
