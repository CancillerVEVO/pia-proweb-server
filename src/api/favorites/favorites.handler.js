const { prisma } = require("../../database/prisma");
const { NotFoundError } = require("../../handlers/errors/AppError");

const createFavorite = async (reviewId, userId) => {
  const review = await prisma.critica.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw NotFoundError.create("La reseña no existe");
  }

  const favorite = await prisma.favorito.create({
    data: {
      usuario_id: userId,
      critica_id: reviewId,
    },
    include: {
      Critica: true,
      Usuario: true,
    },
  });

  const cleanFavorite = {
    id: favorite.id,
    review: {
      id: favorite.Critica.id,
      titulo: favorite.Critica.titulo_critica,
      contenido: favorite.Critica.contenido,
      calificacion: favorite.Critica.calificacion,
      fechaCreacion: favorite.Critica.fecha_creado,
      fechaActualizacion: favorite.Critica.fecha_actualizado,
    },
  };
  return cleanFavorite;
};
const deleteFavorite = async (reviewId, userId) => {};

module.exports = {
  createFavorite,
  deleteFavorite,
};
