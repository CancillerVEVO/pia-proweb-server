const { body, param } = require("express-validator");
const validationErrors = require("../../middleware/validation.middleware");

const bodyCreateValidator = [
  body("peliculaId")
    .isInt()
    .withMessage("El id de la pelicula debe ser un numero entero")
    .custom((value) => {
      if (value < 0) {
        throw new Error("El id de la pelicula debe ser un numero positivo");
      }
      return true;
    }),
  body("titulo")
    .isString()
    .withMessage("El titulo debe ser un string")
    .isLength({ min: 1, max: 230 })
    .withMessage("El titulo debe tener entre 1 y 230 caracteres"),
  body("contenido")
    .isString()
    .withMessage("El contenido debe ser un string")
    .isLength({ min: 1, max: 230 })
    .withMessage("El contenido debe tener entre 1 y 230 caracteres"),
  body("calificacion")
    .isInt()
    .withMessage("La calificacion debe ser un numero entero")
    .custom((value) => {
      if (value < 0 || value > 10) {
        throw new Error("La calificacion debe ser un numero entre 0 y 10");
      }
      return true;
    }),
  validationErrors,
];

const bodyUpdateValidator = [
  body("titulo")
    .isString()
    .withMessage("El titulo debe ser un string")
    .isLength({ min: 1, max: 230 })
    .withMessage("El titulo debe tener entre 1 y 230 caracteres"),
  body("contenido")
    .isString()
    .withMessage("El contenido debe ser un string")
    .isLength({ min: 1, max: 230 })
    .withMessage("El contenido debe tener entre 1 y 230 caracteres"),
  body("calificacion")
    .isInt()
    .withMessage("La calificacion debe ser un numero entero")
    .custom((value) => {
      if (value < 0 || value > 10) {
        throw new Error("La calificacion debe ser un numero entre 0 y 10");
      }
      return true;
    }),
  validationErrors,
];

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

const movieParamValidator = [
  param("movieId")
    .isInt()
    .withMessage("El id de la pelicula debe ser un numero entero")
    .custom((value) => {
      if (value < 0) {
        throw new Error("El id de la pelicula debe ser un numero positivo");
      }
      return true;
    }),
  validationErrors,
];

module.exports = {
  bodyCreateValidator,
  reviewParamValidator,
  bodyUpdateValidator,
  movieParamValidator,
};
