const { Ticket } = require("../models");
const CrudRepository = require("./crud-repository");

class TicketRepository extends CrudRepository {
  constructor() {
    super(Ticket);
  }

  async getPendingTicekts() {
    try {
      const tickets = await Ticket.findAll({
        where: {
          status: "PENDING",
        },
        limit: 10,
      });

      return tickets;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketRepository;
