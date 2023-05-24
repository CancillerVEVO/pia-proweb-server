const { prisma } = require("../../database/prisma");
const {
  NotFoundError,
  ForbiddenError,
} = require("../../handlers/errors/AppError");
const { buildCommentTree } = require("./comments.utils");

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
      fecha_actualizado: new Date(),
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
    fechaCreado: comentario.fecha_creado,
    fechaActualizado: comentario.fecha_actualizado,
    usuario: {
      id: comentario.Usuario.id,
      nombre: comentario.Usuario.nombre,
      email: comentario.Usuario.email,
    },
  };
};

const deleteComment = async (commentId, userId) => {
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
      "No tienes permisos para eliminar este comentario"
    );
  }

  await prisma.comentario.delete({
    where: {
      id: commentId,
    },
  });

  return true;
};

const getCommentById = async (commentId) => {
  const comment = await prisma.comentario.findUnique({
    where: {
      id: commentId,
    },
    include: {
      Usuario: true,
    },
  });

  if (!comment) {
    throw NotFoundError.create("El comentario no existe");
  }

  return {
    id: comment.id,
    contenido: comment.contenido,
    comentarioPadreId: comment.comentario_padre,
    criticaId: comment.critica_id,
    fechaCreado: comment.fecha_creado,
    fechaActualizado: comment.fecha_actualizado,
    usuario: {
      id: comment.Usuario.id,
      nombre: comment.Usuario.nombre,
      email: comment.Usuario.email,
    },
  };
};

const getAllComments = async (reviewId) => {
  const isReview = await prisma.critica.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!isReview) {
    throw NotFoundError.create("La review no existe");
  }

  const comments = await prisma.comentario.findMany({
    where: {
      critica_id: reviewId,
    },
    include: {
      Usuario: true,
    },
  });

  if (comments.length === 0) {
    return [];
  }

  const comentarios = comments.map((comment) => ({
    id: comment.id,
    contenido: comment.contenido,
    comentarioPadreId: comment.comentario_padre,
    fechaCreado: comment.fecha_creado,
    fechaActualizado: comment.fecha_actualizado,
    usuario: {
      id: comment.Usuario.id,
      nombre: comment.Usuario.nombre,
      email: comment.Usuario.email,
    },
  }));

  return buildCommentTree(comentarios);
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
  getCommentById,
};
