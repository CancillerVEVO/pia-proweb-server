const { prisma } = require("../../../database/prisma");
const { NotFoundError } = require("../../../handlers/errors/AppError");

const getAllComments = async () => {
  const comments = await prisma.comentario.findMany();
  return comments;
};

const updateComment = async (id, { contenido }) => {
  const isComment = await prisma.comentario.findUnique({
    where: {
      id,
    },
  });

  if (!isComment) {
    throw NotFoundError.create("El comentario no existe");
  }

  const comment = await prisma.comentario.update({
    where: {
      id,
    },
    data: {
      contenido,
      fecha_actualizado: new Date(),
    },
  });

  return comment;
};

const deleteComment = async (id) => {
  const isComment = await prisma.comentario.findUnique({
    where: {
      id,
    },
  });

  if (!isComment) {
    throw NotFoundError.create("El comentario no existe");
  }

  await prisma.comentario.delete({
    where: {
      id,
    },
  });

  return;
};

const createComment = async (userId, reviewId, { contenido }) => {};

module.exports = {
  getAllComments,
  updateComment,
  deleteComment,
};
