const { successResponse } = require("../../../handlers/ResponseHandler");
const { getAllUsers } = require("./users.handlers");

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return successResponse(users, "Usuarios obtenidos")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsersController,
};
