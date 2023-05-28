const { body, param } = require("express-validator");
const validationErrors = require("../../../middleware/validation.middleware");

const createBodyValidator = [
  body("usuario_id")
    .isInt()
    .withMessage("El id del usuario debe ser un numero entero")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("El id del usuario debe ser mayor a 0");
      }
      return true;
    }),
  body("pelicula")
    .isInt()
    .withMessage("El id de la pelicula debe ser un numero entero")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("El id de la pelicula debe ser mayor a 0");
      }
      return true;
    }),
  body("titulo_critica")
    .isString()
    .withMessage("El titulo de la crítica debe ser un string")
    .isLength({ min: 1, max: 230 })
    .withMessage("El titulo de la crítica debe tener entre 1 y 230 caracteres"),
  body("contenido")
    .isString()
    .withMessage("El contenido de la crítica debe ser un string")
    .isLength({ min: 1, max: 230 })
    .withMessage(
      "El contenido de la crítica debe tener entre 1 y 230 caracteres"
    ),
  body("calificacion")
    .isInt()
    .withMessage("La calificacion debe ser un numero entero")
    .custom((value) => {
      if (value < 1 || value > 10) {
        throw new Error("La calificacion debe estar entre 1 y 10");
      }
      return true;
    }),
  validationErrors,
];
const editBodyValidator = [
  body("titulo_critica")
    .isString()
    .withMessage("El titulo de la crítica debe ser un string")
    .isLength({ min: 1, max: 230 })
    .withMessage("El titulo de la crítica debe tener entre 1 y 230 caracteres"),
  body("contenido")
    .isString()
    .withMessage("El contenido debe ser un string")
    .isLength({ min: 1, max: 230 })
    .withMessage(
      "El contenido de la crítica debe tener entre 1 y 230 caracteres"
    ),
  body("calificacion")
    .isInt()
    .withMessage("La calificacion debe ser un numero entero")
    .custom((value) => {
      if (value < 1 || value > 10) {
        throw new Error("La calificacion debe estar entre 1 y 10");
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

module.exports = {
  createBodyValidator,
  editBodyValidator,
  paramValidator,
};
