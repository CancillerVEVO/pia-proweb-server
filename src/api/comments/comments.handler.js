const { prisma } = require("../../database/prisma");
const {
  NotFoundError,
  ForbiddenError,
} = require("../../handlers/errors/AppError");

const createComment = async (
  { comentarioPadreId, contenido },
  reviewId,
  userId
) => {
  const isReview = await prisma.critica.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!isReview) {
    throw NotFoundError.create("La review no existe");
  }

  const createQuery = {
    data: {
      usuario_id: userId,
      critica_id: reviewId,
      contenido,
      comentario_padre: comentarioPadreId,
    },
    include: {
      Usuario: true,
    },
  };

  if (comentarioPadreId === null) {
    const comentario = await prisma.comentario.create(createQuery);

    return {
      id: comentario.id,
      contenido: comentario.contenido,
      comentarioPadreId: comentario.comentario_padre,
      criticaId: comentario.critica_id,
      fechaCreado: comentario.fecha_creado,
      usuario: {
        id: comentario.Usuario.id,
        nombre: comentario.Usuario.nombre,
        email: comentario.Usuario.email,
      },
    };
  }

  const isComment = await prisma.comentario.findUnique({
    where: {
      id: comentarioPadreId,
    },
  });

  if (!isComment) {
    throw NotFoundError.create("El comentario padre no existe");
  }

  const comentario = await prisma.comentario.create(createQuery);

  return {
    id: comentario.id,
    contenido: comentario.contenido,
    comentarioPadreId: comentario.comentario_padre,
    criticaId: comentario.critica_id,
    fechaCreado: comentario.fecha_creado,
    usuario: {
      id: comentario.Usuario.id,
      nombre: comentario.Usuario.nombre,
      email: comentario.Usuario.email,
    },
  };
};

const updateComment = async ({ contenido }, commentId, userId) => {
  const isComment = await prisma.comentario.findUnique({
    where: {
      id: commentId,
    },

    include: {
      Usuario: true,
    },
  });

  if (!isComment) {
    throw NotFoundError.create("El comentario no existe");
  }

  if (isComment.Usuario.id !== userId) {
    throw ForbiddenError.create(
      "No tienes permisos para editar este comentario"
    );
  }

  const comentario = await prisma.comentario.update({
    where: {
      id: commentId,
    },

    data: {
      contenido,
    },

    include: {
      Usuario: true,
    },
  });

  return {
    id: comentario.id,
    contenido: comentario.contenido,
    comentarioPadreId: comentario.comentario_padre,
    criticaId: comentario.critica_id,
    fecha: comentario.fecha_creado,
    usuario: {
      id: comentario.Usuario.id,
      nombre: comentario.Usuario.nombre,
      email: comentario.Usuario.email,
    },
  };
};

const deleteComment = async (reviewId, commentId, userId) => {};

const getAllComments = async (reviewId) => {};

const getCommentById = async (reviewId, commentId) => {};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
  getCommentById,
};
