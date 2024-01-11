import { ticketModel } from "../db/models/ticket.model.js";

class TicketsManager {
    async createTicket(ticket) {
        const response = await ticketModel.create(ticket); 
        return response; 
    }
}

export const ticketsManager = new TicketsManager();