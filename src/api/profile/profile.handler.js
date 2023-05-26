const { prisma } = require("../../database/prisma");
const tmdb = require("../../tmdb");
const {
  NotFoundError,
  ForbiddenError,
} = require("../../handlers/errors/AppError");

const getProfile = async (userId) => {
  const user = await prisma.usuario.findUnique({
    where: {
      id: userId,
    },
    include: {
      Critica: true,
    },
  });

  if (!user) {
    throw NotFoundError.create("El usuario no existe");
  }

  const reviews = user.Critica;

  const movies = await Promise.all(
    reviews.map(async (review) => {
      const pelicula = await tmdb.getMovieDetails({
        movieId: review.pelicula,
      });
      return pelicula;
    })
  );

  return {
    user: {
      id: user.id,
      nombre: user.nombre,
      biografia: user.biografia,
      fechaCreacion: user.fecha_creado,
      fechaActualizacion: user.fecha_actualizado,
      reviews: reviews.map((review, index) => ({
        id: review.id,
        titulo: review.titulo_critica,
        contenido: review.contenido,
        calificacion: review.calificacion,
        fechaCreacion: review.fecha_creado,
        pelicula: movies[index],
      })),
    },
  };
};
const updateProfile = async (userId, { nombre, biografia }) => {
  const user = await prisma.usuario.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw NotFoundError.create("El usuario no existe");
  }

  const isForbidden = user.id !== userId;

  if (isForbidden) {
    throw ForbiddenError.create(
      "No tienes permiso para actualizar este perfil"
    );
  }

  const nameAlreadyTaken = await prisma.usuario.findUnique({
    where: {
      nombre,
    },
  });

  if (nameAlreadyTaken) {
    throw ForbiddenError.create("El nombre de usuario ya está en uso");
  }

  const updatedUser = await prisma.usuario.update({
    where: {
      id: userId,
    },
    data: {
      nombre,
      biografia,
      fecha_actualizado: new Date(),
    },
  });

  return {
    user: {
      id: updatedUser.id,
      nombre: updatedUser.nombre,
      biografia: updatedUser.biografia,
      fechaCreacion: updatedUser.fecha_creado,
      fechaActualizacion: updatedUser.fecha_actualizado,
    },
  };
};
const getFavorites = async (userId) => {};

module.exports = {
  getProfile,
  updateProfile,
  getFavorites,
};
