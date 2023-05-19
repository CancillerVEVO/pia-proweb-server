const {
  createdResponse,
  successResponse,
} = require("../../handlers/ResponseHandler");
const { login, register, me } = require("./auth.handler");

module.exports = {
  registerController: async ({ body }, res, next) => {
    try {
      const user = await register(body);

      return createdResponse(user, "Usuario creado con exito!")(res);
    } catch (error) {
      next(error);
    }
  },
  loginController: async ({ body }, res, next) => {
    try {
      const token = await login(body);

      return createdResponse({ token }, "Inicio de sesión exitoso!")(res);
    } catch (error) {
      next(error);
    }
  },

  meController: async ({ user }, res, next) => {
    try {
      const data = await me(parseInt(user));
      return successResponse(data)(res);
    } catch (error) {
      next(error);
    }
  },
};
