const { prisma } = require("../../../database/prisma");
const {
  UnauthorizedError,
  NotFoundError,
} = require("../../../handlers/errors/AppError");
const { encrypt } = require("../../auth/utils/bcrypt");

const getAllUsers = async (userId) => {
  const users = await prisma.usuario.findMany({
    where: {
      id: {
        not: userId,
      },
    },
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

const createUser = async ({ nombre, email, password, rol, biografia }) => {
  const userExists = await prisma.usuario.findFirst({
    where: {
      OR: [{ nombre }, { email }],
    },
  });

  if (userExists) {
    throw UnauthorizedError.create("El usuario ya existe");
  }

  const isRol = await prisma.rol.findFirst({
    where: {
      nombre: rol,
    },
  });

  if (!isRol) {
    throw UnauthorizedError.create("El rol no existe");
  }
  const hash = await encrypt(password);

  const user = await prisma.usuario.create({
    data: {
      nombre,
      email,
      password: hash,
      biografia,
      rol_id: isRol.id,
    },
    include: {
      Rol: true,
    },
  });

  return {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    biografia: user.biografia,
    rol: user.Rol.nombre,
    fechaCreacion: user.fecha_creado,
  };
};

const updateUser = async (id, { nombre, email, password, rol, biografia }) => {
  const [isUser, userExists, isRol] = await prisma.$transaction([
    prisma.usuario.findUnique({
      where: {
        id,
      },
    }),
    prisma.usuario.findFirst({
      where: {
        OR: [{ nombre }, { email }],
      },
    }),
    prisma.rol.findFirst({
      where: {
        nombre: rol,
      },
    }),
  ]);

  if (!isUser) {
    throw NotFoundError.create("El usuario no existe");
  }

  if (userExists && userExists.id !== id) {
    throw UnauthorizedError.create("El usuario ya existe");
  }

  if (!isRol) {
    throw UnauthorizedError.create("El rol no existe");
  }

  if (!password) {
    const user = await prisma.usuario.update({
      where: {
        id,
      },
      data: {
        nombre,
        email,
        biografia,
        rol_id: isRol.id,
        fecha_actualizado: new Date(),
      },
      include: {
        Rol: true,
      },
    });

    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      biografia: user.biografia,
      rol: user.Rol.nombre,
      fechaCreacion: user.fecha_creado,
      fechaActualizado: user.fecha_actualizado,
    };
  }
  const hash = await encrypt(password);

  const user = await prisma.usuario.update({
    where: {
      id,
    },
    data: {
      nombre,
      email,
      password: hash,
      biografia,
      rol_id: isRol.id,
      fecha_actualizado: new Date(),
    },
    include: {
      Rol: true,
    },
  });

  return {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    biografia: user.biografia,
    rol: user.Rol.nombre,
    fechaCreacion: user.fecha_creado,
    fechaActualizado: user.fecha_actualizado,
  };
};

const deleteUser = async (id) => {
  const user = await prisma.usuario.delete({
    where: {
      id,
    },
  });

  return user;
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
