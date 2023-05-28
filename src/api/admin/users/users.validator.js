const { body, param } = require("express-validator");
const validationErrors = require("../../../middleware/validation.middleware");

const createBodyValidator = [
  body("nombre")
    .matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,30}$/)
    .withMessage(
      "El nombre de usuario debe contener al menos una letra, y solo puede contener letras, números y guiones bajos. Debe tener entre 3 y 30 caracteres."
    ),
  body("email")
    .isEmail()
    .withMessage("El email no es válido.")
    .exists()
    .withMessage("El email es requerido.")
    .isLength({ max: 200 }),
  body("password")
    .isLength({ min: 6, max: 200 })
    .withMessage("La contraseña debe tener un mínimo de 6 caracteres."),
  body("rol")
    .isIn(["ADMIN", "USER"])
    .withMessage("El rol debe ser ADMIN o USER"),
  body("biografia")
    .optional()
    .isString()
    .withMessage("La biografia debe ser un string"),

  validationErrors,
];

const updateBodyValidator = [
  body("nombre")
    .matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,30}$/)
    .withMessage(
      "El nombre de usuario debe contener al menos una letra, y solo puede contener letras, números y guiones bajos. Debe tener entre 3 y 30 caracteres."
    ),
  body("email")
    .isEmail()
    .withMessage("El email no es válido.")
    .exists()
    .withMessage("El email es requerido.")
    .isLength({ max: 200 }),
  body("password")
    .optional()
    .isLength({ min: 6, max: 200 })
    .withMessage("La contraseña debe tener un mínimo de 6 caracteres."),
  body("rol")
    .isIn(["ADMIN", "USER"])
    .withMessage("El rol debe ser ADMIN o USER"),
  body("biografia")
    .optional()
    .isString()
    .withMessage("La biografia debe ser un string"),

  validationErrors,
];

const paramValidator = [
  param("id")
    .isInt()
    .withMessage("El id del usuario debe ser un numero entero")
    .custom((value) => {
      if (value < 0) {
        throw new Error("El id del usuario debe ser un numero positivo");
      }
      return true;
    }),
  validationErrors,
];

module.exports = {
  createBodyValidator,
  updateBodyValidator,
  paramValidator,
};
