const express = require("express");
const router = express.Router();

const { EmailController } = require("../../controllers");
const { sendMail, createTicket, getPendingTicekts } = EmailController;

router.post("/", sendMail);
router.post("/ticket", createTicket);
router.get("/tickets", getPendingTicekts);

module.exports = router;
