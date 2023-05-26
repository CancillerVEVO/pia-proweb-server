const { body } = require("express-validator");
const validationErrors = require("../../middleware/validation.middleware");

const updateProfileValidator = [
  body("nombre")
    .matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,30}$/)
    .withMessage(
      "El nombre de usuario debe contener al menos una letra, y solo puede contener letras, números y guiones bajos. Debe tener entre 3 y 30 caracteres."
    ),
  body("biografia")
    .exists()
    .withMessage("La biografia es requerida")
    .isString()
    .withMessage("La biografia debe ser un string")
    .isLength({ min: 1, max: 250 }),
  validationErrors,
];

module.exports = { updateProfileValidator };
