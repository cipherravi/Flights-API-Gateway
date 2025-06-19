const { getLogger } = require("../../config");
const logger = getLogger(__filename);
const { EmailService } = require("../../services");
const { TicketRepository } = require("../../repositories");
const ticketRepositoty = new TicketRepository();

function sendPendingMails() {
  setInterval(async () => {
    try {
      const pendingTickets = await EmailService.getPendingTickets();
      const plainTickets = pendingTickets.map((ticket) => ticket.get());

      if (plainTickets == []) {
        return;
      }
      for (const ticket of plainTickets) {
        const id = ticket.id;
        const header = ticket.header;
        const to = ticket.recepientEmail;
        const subject = ticket.subject;
        const text = ticket.content;

        await EmailService.sendMail(header, to, subject, text);
        await ticketRepositoty.update(id, { status: "SUCCESS" });
      }
    } catch (error) {}
  }, 1000 * 10);
}

module.exports = sendPendingMails;
