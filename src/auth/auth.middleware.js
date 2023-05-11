const { body } = require("express-validator");
const validationErrors = require("../middleware/validation.middleware");

const registerValidator = [
  body("nombre").exists().withMessage("El nombre es requerido"),
  body("email").exists().withMessage("El email es requerido"),
  body("contraseña")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener un mínimo de 6 caracteres."),
  body("confirmarContraseña").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden.");
    }
    return true;
  }),
  validationErrors,
];

module.exports = registerValidator;
