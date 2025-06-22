const { getLogger } = require("../../config");
const logger = getLogger(__filename);
const { EmailService } = require("../../services");
const { TicketRepository } = require("../../repositories");
const ticketRepositoty = new TicketRepository();
const compileTemplate = require("../../utils/helper/templateHelper");

function sendPaymentMails() {
  setInterval(async () => {
    try {
      const pendingTickets = await EmailService.getPendingTickets();
      const plainTickets = pendingTickets.map((ticket) => ticket.get());

      if (plainTickets == []) {
        return;
      }
      for (const ticket of plainTickets) {
        const {
          id,
          header,
          customerEmail,
          subject,
          templateName,
          templateData,
        } = ticket;
        const content = compileTemplate(templateName, templateData);

        await EmailService.sendMail(header, customerEmail, subject, content);
        await ticketRepositoty.update(id, { status: "SUCCESS" });
      }
    } catch (error) {}
  }, 1000 * 10);
}

module.exports = sendPaymentMails;
