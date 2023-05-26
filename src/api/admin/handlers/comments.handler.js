const { prisma } = require("../../../database/prisma");

const getAllComments = async () => {
  const comments = await prisma.comentario.findMany();
  return comments;
};

module.exports = {
  getAllComments,
};
