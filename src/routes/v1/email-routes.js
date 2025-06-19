const express = require("express");
const router = express.Router();

const { EmailController } = require("../../controllers");
const { sendMail, createTicket, getPendingTickets } = EmailController;

router.post("/", sendMail);
router.post("/ticket", createTicket);
router.get("/tickets", getPendingTickets);

module.exports = router;
