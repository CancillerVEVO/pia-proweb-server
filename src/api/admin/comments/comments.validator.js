const { body, param } = require("express-validator");
const validationErrors = require("../../../middleware/validation.middleware");

const createBodyValidator = [
  body("contenido")
    .isString()
    .withMessage("El contenido debe ser un string")
    .isLength({ min: 1, max: 230 })
    .withMessage(
      "El contenido de la crítica debe tener entre 1 y 230 caracteres"
    ),
];

const updateBodyValidator = [
  body("contenido")
    .isString()
    .withMessage("El contenido debe ser un string")
    .isLength({ min: 1, max: 230 })
    .withMessage(
      "El contenido de la crítica debe tener entre 1 y 230 caracteres"
    ),
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
  validationErrors,
];

const paramValidator = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("El id debe ser mayor a 0");
      }
      return true;
    }),
  validationErrors,
];

const reviewIdValidator = [
  param("reviewId")
    .isInt()
    .withMessage("El id de la review debe ser un numero entero")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("El id de la review debe ser mayor a 0");
      }
      return true;
    }),

  validationErrors,
];
module.exports = {
  createBodyValidator,
  paramValidator,
  updateBodyValidator,
  reviewIdValidator,
};
