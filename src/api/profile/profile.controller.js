const { successResponse } = require("../../handlers/ResponseHandler");

const getProfile = async (req, res, next) => {
  try {
    res.send("Get Profile");
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    res.send("Update Profile");
  } catch (error) {
    next(error);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    res.send("Get Favorites");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getFavorites,
};
