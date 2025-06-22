const { TicketRepository } = require("../../repositories");
const ticketRepositoty = new TicketRepository();

function clearMails() {
  setInterval(async () => {
    const successTickets = await ticketRepositoty.getSuccessTickets();
    const plainTickets = successTickets.map((ticket) => ticket.get());

    for (const ticket of plainTickets) {
      const { id } = ticket;
      await ticketRepositoty.destroy({ id });
    }
  }, 1000 * 60 * 10);
}

module.exports = clearMails;
