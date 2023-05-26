const { prisma } = require("../../database/prisma");
const {
  UnauthorizedError,
  NotFoundError,
} = require("../../handlers/errors/AppError");
const { encrypt, verify } = require("./utils/bcrypt");
const { generateToken } = require("./utils/jsonwebtoken");

const register = async ({ nombre, email, password }) => {
  const userExists = await prisma.usuario.findFirst({
    where: {
      OR: [{ nombre }, { email }],
    },
  });

  if (userExists) {
    throw UnauthorizedError.create("El usuario ya existe");
  }

  const hash = await encrypt(password);

  const user = await prisma.usuario.create({
    data: {
      nombre,
      email,
      password: hash,
    },
  });

  return {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    biografia: user.biografia,
    fechaCreacion: user.fecha_creado,
  };
};

const login = async ({ email, password }) => {
  const user = await prisma.usuario.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw UnauthorizedError.create("Credenciales inválidas");
  }

  const validPassword = await verify(password, user.password);

  if (!validPassword) {
    throw UnauthorizedError.create("Credenciales inválidas");
  }

  const token = generateToken(user.id);

  return token;
};

const me = async (id) => {
  const user = await prisma.usuario.findUnique({
    where: {
      id,
    },
    include: {
      Rol: true,
    },
  });

  if (!user) {
    throw NotFoundError.create("Usuario no encontrado");
  }

  return {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    biografia: user.biografia,
    fechaCreacion: user.fecha_creado,
    rol: user.Rol.nombre,
  };
};

module.exports = {
  register,
  login,
  me,
};
