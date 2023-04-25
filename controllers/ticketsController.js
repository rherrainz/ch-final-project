import { TicketManager } from "../src/services/ticketsService";

const ticketManager = new TicketManager();

export class TicketControler{
    async getTickets(req, res) {
        try {
            const tickets = await ticketManager.getTickets();
            res.json(tickets);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async getTicketById(req, res) {
        try {
            const ticket = await ticketManager.getTicketById(req.params.id);
            res.json(ticket);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async addTicket(req, res) {
        try {
            const cart = req.body.cart;
            await ticketManager.addTicket(cart);
            res.json({ message: "Ticket created" });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async updateTicketById(req, res) {
        try {
            const id = req.params.id;
            const products = req.body.products;
            await ticketManager.updateTicketById(id, products);
            res.json({ message: "Ticket updated" });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async deleteTicketById(req, res) {
        try {
            const id = req.params.id;
            await ticketManager.deleteTicketById(id);
            res.json({ message: "Ticket deleted" });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async addProductToTicket(req, res) {
        try {
            const id = req.params.id;
            const pid = req.body.pid;
            await ticketManager.addProductToTicket(id, pid);
            res.json({ message: "Product added to ticket" });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async deleteProductFromTicket(req, res) {
        try {
            const id = req.params.id;
            const pid = req.body.pid;
            await ticketManager.deleteProductFromTicket(id, pid);
            res.json({ message: "Product deleted from ticket" });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async deleteAllProductsFromTicket(req, res) {
        try {
            const id = req.params.id;
            await ticketManager.deleteAllProductsFromTicket(id);
            res.json({ message: "All products deleted from ticket" });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}