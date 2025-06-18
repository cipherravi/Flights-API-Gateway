const nodemailer = require("nodemailer");

const { GMAIL_ID, GMAIL_PASSWORD } = require("./server-config");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: GMAIL_ID,
    pass: GMAIL_PASSWORD,
  },
});

module.exports = transporter;
