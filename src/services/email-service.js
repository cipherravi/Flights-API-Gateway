const AppError = require("../utils/AppError");
const { StatusCodes } = require("http-status-codes");
const { getLogger, ServerConfig } = require("../config");
const { GMAIL_ID: from } = ServerConfig;
const logger = getLogger(__filename);
const { MailConfig } = require("../config");
const { TicketRepository } = require("../repositories");
const ticketRepositoty = new TicketRepository();

async function sendMail(header, customerEmail, subject, content) {
  try {
    // Email options
    let mailOptions = {
      from: `${header} ${from}`,
      to: `${customerEmail}`,
      subject: `${subject}`,
      // text: `${text}`,
      html: `${content}`,
    };

    //Send Mail
    const info = await MailConfig.sendMail(mailOptions);
    return info.response;
  } catch (error) {
    throw error;
  }
}
async function createTicket(data) {
  try {
    const ticket = await ticketRepositoty.create(data);
    return ticket;
  } catch (error) {
    throw error;
  }
}
async function getPendingTickets() {
  try {
    const response = await ticketRepositoty.getPendingTickets();

    if (!response) {
      throw new AppError(
        "Cannot fetch more pending tickets",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = { sendMail, createTicket, getPendingTickets };
