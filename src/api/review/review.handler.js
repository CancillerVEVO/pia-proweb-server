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

module.exports = {
  createReview,
  getReviewById,
};
