const checkJWT = require("../../middleware/session.middleware");
const { isAdmin } = require("./admin.middleware");

const express = require("express");
const router = express.Router();

router.use(checkJWT);
router.use(isAdmin);
router.use("/", require("./users"));
router.use("/", require("./reviews"));
router.use("/", require("./comments"));

module.exports = router;
