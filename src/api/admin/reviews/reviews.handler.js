const { prisma } = require("../../../database/prisma");
const tmdb = require("../../../tmdb");
const {
  UnauthorizedError,
  NotFoundError,
} = require("../../../handlers/errors/AppError");

const getAllReviews = async () => {
  const reviews = await prisma.critica.findMany({
    include: {
      Usuario: true,
    },
  });

  return reviews.map((review) => ({
    id: review.id,
    usuario_id: review.usuario_id,
    email: review.Usuario.email,
    pelicula_id: review.pelicula,
    titulo_critica: review.titulo_critica,
    contenido: review.contenido,
    calificacion: review.calificacion,
    fecha_creado: review.fecha_creado,
    fecha_actualizado: review.fecha_actualizado,
  }));
};

const editReview = async (id, { titulo_critica, contenido, calificacion }) => {
  const isReview = await prisma.critica.findUnique({
    where: {
      id,
    },
  });

  if (!isReview) {
    throw NotFoundError.create("La crítica no existe");
  }

  const review = await prisma.critica.update({
    where: {
      id,
    },
    data: {
      titulo_critica,
      contenido,
      calificacion,
    },
  });

  return review;
};

const deleteReview = async (id) => {
  const isReview = await prisma.critica.findUnique({
    where: {
      id,
    },
  });

  if (!isReview) {
    throw NotFoundError.create("La crítica no existe");
  }

  await prisma.critica.delete({
    where: {
      id,
    },
  });

  return;
};

const createReview = async ({
  usuario_id,
  pelicula,
  titulo_critica,
  contenido,
  calificacion,
}) => {
  const isUser = await prisma.usuario.findUnique({
    where: {
      id: usuario_id,
    },
  });

  if (!isUser) {
    throw UnauthorizedError.create("El usuario no existe");
  }

  const isMovie = await tmdb.getMovieDetails({
    movieId: pelicula,
  });

  if (!isMovie) {
    throw UnauthorizedError.create("La película no existe");
  }

  const review = await prisma.critica.create({
    data: {
      usuario_id,
      pelicula,
      titulo_critica,
      contenido,
      calificacion,
    },
  });

  return review;
};

module.exports = {
  getAllReviews,
  editReview,
  deleteReview,
  createReview,
};
