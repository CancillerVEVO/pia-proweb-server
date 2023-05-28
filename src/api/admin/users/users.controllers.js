const {
  successResponse,
  createdResponse,
  noContentResponse,
} = require("../../../handlers/ResponseHandler");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("./users.handlers");

const getAllUsersController = async ({ user }, res, next) => {
  try {
    const users = await getAllUsers(Number(user));
    return successResponse({ users }, "Usuarios obtenidos")(res);
  } catch (error) {
    next(error);
  }
};

const createUserController = async ({ body }, res, next) => {
  try {
    const user = await createUser(body);

    return createdResponse({ user }, "Usuario creado")(res);
  } catch (error) {
    next(error);
  }
};

const updateUserController = async ({ params, body }, res, next) => {
  try {
    const user = await updateUser(Number(params.id), body);

    return successResponse({ user }, "Usuario actualizado")(res);
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async ({ params }, res, next) => {
  try {
    await deleteUser(Number(params.id));

    return noContentResponse("Usuario eliminado")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
};
