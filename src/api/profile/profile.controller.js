const { successResponse } = require("../../handlers/ResponseHandler");
const {
  getProfile,
  updateProfile,
  getFavorites,
} = require("./profile.handler");

const getProfileController = async (req, res, next) => {
  try {
    const user = await getProfile(Number(req.user));
    return successResponse(user, "Perfil obtenido")(res);
  } catch (error) {
    next(error);
  }
};

const updateProfileController = async (req, res, next) => {
  try {
    const user = await updateProfile(Number(req.user), req.body);
    return successResponse(user, "Perfil actualizado")(res);
  } catch (error) {
    next(error);
  }
};

const getFavoritesController = async (req, res, next) => {
  try {
    const favorites = await getFavorites(Number(req.user));
    return successResponse(favorites, "Favoritos obtenidos")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfileController,
  updateProfileController,
  getFavoritesController,
};
