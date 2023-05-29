const { param, body, query } = require("express-validator");
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
const commentParamValidator = [
  param("commentId")
    .isInt()
    .withMessage("El id del comentario debe ser un numero entero")
    .custom((value) => {
      if (value < 0) {
        throw new Error("El id del comentario debe ser un numero positivo");
      }
      return true;
    }),
  validationErrors,
];
const bodyCreateValidator = [
  body("comentarioPadreId")
    .optional({
      nullable: true,
    })
    .isInt()
    .withMessage("El id del comentario padre debe ser un numero entero")
    .custom((value) => {
      if (value < 0) {
        throw new Error(
          "El id del comentario padre debe ser un numero positivo"
        );
      }
      return true;
    }),
  body("contenido")
    .isString()
    .withMessage("El contenido debe ser un string")
    .isLength({ min: 1, max: 230 }),
  validationErrors,
];
const bodyUpdateValidator = [
  body("contenido")
    .isString()
    .withMessage("El contenido debe ser un string")
    .isLength({ min: 1, max: 230 }),
  validationErrors,
];

module.exports = {
  reviewParamValidator,
  commentParamValidator,
  bodyCreateValidator,
  bodyUpdateValidator,
};
