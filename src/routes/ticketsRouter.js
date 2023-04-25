import { Router } from "express";
import { TicketController } from "../../controllers/ticketsControllers.js";
import { isAdmin, isLogged } from "../middlewares/auth.middlewares.js";

const router = Router();
const ticketController = new TicketController();

//get all tickets
router.get("/", isAdmin(), ticketController.getTickets());


//get one ticket by id
router.get("/:id", isLogged(), ticketController.getTicketById());

//add a new ticket
router.post("/", isLogged(), ticketController.addTicket());

//update a ticket by id
router.put("/:id", isLogged(), ticketController.updateTicketById());

//delete a ticket by id
router.delete("/:id", isAdmin(), ticketController.deleteTicketById());

//add a product to a ticket by id
router.post("/:id/product/:pid", isLogged, ticketController.addProductToTicket());

//update a product quantity in a ticket by id
router.put("/:id/product/:pid", isLogged(), ticketController.updateQuantityById());

//delete a product from a ticket by id
router.delete("/:id/product/:pid", isLogged(), ticketController.deleteProductFromTicketById());

//delete all products from ticket
router.delete("/allproducts/:id", isAdmin(), ticketController.deleteAllProductsFromTicket());

export default router;