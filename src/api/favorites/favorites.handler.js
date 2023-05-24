const { prisma } = require("../../database/prisma");
const {
  NotFoundError,
  ForbiddenError,
} = require("../../handlers/errors/AppError");

const createFavorite = async (reviewId, userId) => {
  const [review, isFavorite] = await prisma.$transaction([
    prisma.critica.findUnique({
      where: {
        id: reviewId,
      },
    }),
    prisma.favorito.findUnique({
      where: {
        usuario_id_critica_id: {
          usuario_id: userId,
          critica_id: reviewId,
        },
      },
    }),
  ]);

  if (isFavorite) {
    throw ForbiddenError.create("La reseña ya es favorita");
  }

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
const deleteFavorite = async (reviewId, userId) => {
  const favorite = await prisma.favorito.findUnique({
    where: {
      usuario_id_critica_id: {
        usuario_id: userId,
        critica_id: reviewId,
      },
    },
  });

  if (!favorite) {
    throw NotFoundError.create("El favorito no existe");
  }

  await prisma.favorito.delete({
    where: {
      usuario_id_critica_id: {
        usuario_id: userId,
        critica_id: reviewId,
      },
    },
  });

  return true;
};

module.exports = {
  createFavorite,
  deleteFavorite,
};
