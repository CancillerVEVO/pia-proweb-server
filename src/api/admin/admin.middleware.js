const { prisma } = require("../../database/prisma");
const { ForbiddenError } = require("../../handlers/errors/AppError");
const isAdmin = async (req, res, next) => {
  try {
    const adminRole = await prisma.rol.findFirst({
      where: {
        nombre: "ADMIN",
      },
    });

    const isAdmin = await prisma.usuario.findFirst({
      where: {
        id: Number(req.user),
        rol_id: adminRole.id,
      },
    });

    if (!isAdmin) {
      throw ForbiddenError.create(
        "No tienes permisos para realizar esta acción"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAdmin,
};
