const express = require("express");
const router = express.Router();
const { infoController } = require("../../controllers");
const emailRoutes = require("./email-routes");
router.use("/info", infoController);
router.use("/mail", emailRoutes);

module.exports = router;
