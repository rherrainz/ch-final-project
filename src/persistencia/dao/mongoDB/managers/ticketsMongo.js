import { ticketsModel } from "../persistencia/dao/mongoDB/models/ticketsModel.js";

export class TicketMongo {
    async getTickets() {
        try {
            const infoTickets = await ticketsModel.find();
            return infoTickets;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async getTicketById(id) {
        try {
            const ticket = await ticketsModel.findById(id).lean();
            return ticket;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async addTicket(cart) {
        try {
            const ticket = {
                products: [],
                cart,
            };
            const newTicket = await ticketsModel.create(ticket);
            await newTicket.save();
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async updateTicketById(id, products) {
        try {
            const updatedTicket = await ticketsModel.findByIdAndUpdate(id, {
                products,
            });
            return updatedTicket;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async deleteTicketById(id) {
        try {
            const deletedTicket = await ticketsModel.findByIdAndDelete(id);
            return deletedTicket;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async addProductToTicket(id, pid) {
        try {
            const ticket = await this.getTicketById(id);
            const product = pid;
            if (!ticket) {
                return console.log("Ticket not found");
            } else {
                console.log(ticket);
                const products = ticket.products;
                const productFound = products.find((p) => p.pId == pid);
                if (productFound) {
                    productFound.quantity += 1;
                } else {
                    products.push({ pId: product, quantity: 1 });
                }
                await this.updateTicketById(id, products);
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async deleteProductFromTicket(id, pid) {
        try {
            const ticket = await this.getTicketById(id);
            const product = pid;
            if (!ticket) {
                return console.log("Ticket not found");
            } else {
                console.log(ticket);
                const products = ticket.products;
                const productFound = products.find((p) => p.pId == pid);
                if (productFound) {
                    const index = products.indexOf(productFound);
                    products.splice(index, 1);
                }
                await this.updateTicketById(id, products);
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async deleteAllProductsFromTicket(id) {
        try {
            const ticket = await this.getTicketById(id);
            if (!ticket) {
                return console.log("Ticket not found");
            } else {
                const products = [];
                await this.updateTicketById(id, products);
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    
}