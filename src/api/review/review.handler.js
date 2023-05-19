const review = require(".");
const { prisma } = require("../../database/prisma");
const {
  NotFoundError,
  ForbiddenError,
} = require("../../handlers/errors/AppError");
const tmdb = require("../../tmdb");

const createReview = async (
  { peliculaId, titulo, contenido, calificacion },
  userId
) => {
  // ERROR si la pelicula no existe
  await tmdb.getMovieDetails({ movieId: peliculaId });

  const review = await prisma.critica.create({
    data: {
      usuario_id: userId,
      titulo_critica: titulo,
      contenido,
      calificacion,
      pelicula: peliculaId,
    },
  });

  return review;
};

const getReviewById = async (reviewId, userId) => {
  const review = await prisma.critica.findUnique({
    where: {
      id: reviewId,
    },
    include: {
      Usuario: true,
    },
  });

  if (!review) {
    throw NotFoundError.create("La reseña no existe");
  }

  const isFavorite = await prisma.favorito.findUnique({
    where: {
      usuario_id_critica_id: {
        usuario_id: userId,
        critica_id: reviewId,
      },
    },
  });

  const pelicula = await tmdb.getMovieDetails({ movieId: review.pelicula });

  return {
    review: {
      id: review.id,
      titulo: review.titulo_critica,
      contenido: review.contenido,
      calificacion: review.calificacion,
      fechaCreacion: review.fecha_creado,
      autor: {
        id: review.Usuario.id,
        nombre: review.Usuario.nombre,
        email: review.Usuario.email,
        biografia: review.Usuario.biografia,
      },
      esFavorito: Boolean(isFavorite),
    },
    pelicula,
  };
};

const updateReview = async (
  reviewId,
  { titulo, contenido, calificacion },
  userId
) => {
  const isCreator = await prisma.critica.findFirst({
    where: {
      id: reviewId,
      usuario_id: userId,
    },
  });

  if (!isCreator) {
    throw ForbiddenError.create("No tienes permiso para editar esta reseña");
  }

  const review = await prisma.critica.update({
    where: {
      id: reviewId,
    },
    data: {
      titulo_critica: titulo,
      contenido,
      calificacion,
    },
  });

  return review;
};

const deleteReview = async (reviewId, userId) => {
  const isCreator = await prisma.critica.findFirst({
    where: {
      id: reviewId,
      usuario_id: userId,
    },
  });

  if (!isCreator) {
    throw ForbiddenError.create("No tienes permiso para eliminar esta reseña");
  }

  await prisma.critica.delete({
    where: {
      id: reviewId,
    },
  });

  return true;
};
const getAllReviews = async () => {};
const getReviewsByMovieId = async () => {};

module.exports = {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
};
