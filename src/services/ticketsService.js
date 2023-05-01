import { TicketsMongo } from "../persistencia/dao/mongoDB/managers/ticketsMongo.js";

const ticketsMongo = new TicketsMongo();
export class TicketManager {
    async getTickets() {
        try {
            const infoTickets = await ticketsMongo.getTickets();
            return infoTickets;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async getTicketById(id) {
        try {
            const ticket = await ticketsMongo.getTicketById(id);
            return ticket;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async addTicket(cart) {
        try {
            const newTicket = await ticketsMongo.addTicket(cart);
            return newTicket
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async updateTicketById(id, products) {
        try {
            const updatedTicket = await ticketsMongo.updateTicketById(id, products);
            return updatedTicket;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async deleteTicketById(id) {
        try {
            const deletedTicket = await ticketsMongo.deleteTicketById(id);
            return deletedTicket;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async addProductToTicket(id, pid) {
        try {
            const newTicket = await ticketsMongo.addProductToTicket(id, pid);
            return newTicket;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async deleteProductFromTicket(id, pid) {
        try {
            const newTicket = await ticketsMongo.deleteProductFromTicket(id, pid);
            return newTicket;
            }catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async deleteAllProductsFromTicket(id) {
        try {
            const newTicket = await ticketsMongo.deleteAllProductsFromTicket(id);
            return newTicket;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    
}