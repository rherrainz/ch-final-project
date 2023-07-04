import {Router} from 'express';
import { CartController } from '../controllers/cartsControllers.js';
import { isLogged } from '../middlewares/auth.middlewares.js';
import { sendEmailDeletedProduct } from '../controllers/mailControllers.js';

const cartRouter = Router();
const cartController = new CartController();

//get all carts
cartRouter.get('/', cartController.getCarts); 

//get one cart by id
cartRouter.get('/:cid', cartController.getCartById);

//add a new cart
cartRouter.post('/', isLogged, cartController.addCart);

//update a cart by id
cartRouter.put('/:cid', isLogged, cartController.updateCartById);

//update a product quantity in a cart by id
cartRouter.put('/:cid/product/:pid', isLogged, cartController.updateQuantityById);

//delete a cart by id
cartRouter.delete('/:cid', isLogged,cartController.deleteCartById);

//delete a product from a cart by id
cartRouter.delete('/:cid/product/:pid', cartController.deleteProductFromCartById,sendEmailDeletedProduct);

//add a product to a cart by id
cartRouter.post('/:cid/product/:pid', cartController.addProductToCartById);

//update a product quantity in a cart by id
cartRouter.put('/:cid/product/:pid', isLogged, cartController.updateQuantityById);



export default cartRouter;