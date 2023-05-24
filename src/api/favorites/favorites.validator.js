const { param } = require("express-validator");
const validationErrors = require("../../middleware/validation.middleware");

const reviewParamValidator = [
  param("reviewId")
    .isInt()
    .withMessage("El id de la review debe ser un numero entero")
    .custom((value) => {
      if (value < 0) {
        throw new Error("El id de la review debe ser un numero positivo");
      }
      return true;
    }),
  validationErrors,
];

module.exports = {
  reviewParamValidator,
};
