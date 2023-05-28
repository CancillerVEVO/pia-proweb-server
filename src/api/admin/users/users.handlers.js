const { prisma } = require("../../../database/prisma");

const getAllUsers = async () => {
  const users = await prisma.usuario.findMany({
    include: {
      Rol: true,
    },
  });

  const cleanData = users.map((user) => {
    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.Rol.nombre,
      biografia: user.biografia,
      fecha_creado: user.fecha_creado,
      fecha_actualizado: user.fecha_actualizado,
    };
  });

  return cleanData;
};

module.exports = {
  getAllUsers,
};
