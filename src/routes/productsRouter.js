import {Router} from 'express';
import { ProductController } from '../controllers/productsControllers.js';
import { isAdmin,isLogged } from '../middlewares/auth.middlewares.js';


const productsRouter = Router();
const productController = new ProductController();


//get all products with pagination
productsRouter.get('/', productController.getProducts);

//get product by id
productsRouter.get('/:pid', productController.getProductById);

//add new product
productsRouter.post('/', productController.addProduct);

//update product by id
productsRouter.put('/:pid',  productController.updateProductById);

//delete product by id
productsRouter.delete('/:pid', productController.deleteProductById);

export default productsRouter;