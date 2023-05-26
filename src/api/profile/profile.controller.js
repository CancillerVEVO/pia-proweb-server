const { successResponse } = require("../../handlers/ResponseHandler");
const { getProfile, updateProfile } = require("./profile.handler");

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
    res.send("Get Favorites");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfileController,
  updateProfileController,
  getFavoritesController,
};
