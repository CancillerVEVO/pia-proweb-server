const { getAllUsers } = require("./user.handler");
const { getAllComments } = require("./comments.handler");
const { getAllReviews } = require("./reviews.handler");

module.exports = {
  getAllUsers,
  getAllComments,
  getAllReviews,
};
