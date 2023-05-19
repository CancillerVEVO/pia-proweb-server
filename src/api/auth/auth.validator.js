const { body } = require("express-validator");
const validationErrors = require("../../middleware/validation.middleware");

const registerValidator = [
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
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden.");
    }
    return true;
  }),
  validationErrors,
];

const loginValidator = [
  body("email")
    .exists()
    .withMessage("El email es requerido.")
    .isLength({ min: 1 })
    .withMessage("El email no puede estar vacío."),
  body("password")
    .exists()
    .withMessage("La contraseña es requerida.")
    .isLength({ min: 1 })
    .withMessage("La contraseña no puede estar vacía."),
  validationErrors,
];
module.exports = { registerValidator, loginValidator };
