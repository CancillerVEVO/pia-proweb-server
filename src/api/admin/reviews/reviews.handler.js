const { prisma } = require("../../../database/prisma");

const getAllReviews = async () => {
  const reviews = await prisma.critica.findMany();
  return reviews;
};

module.exports = {
  getAllReviews,
};
