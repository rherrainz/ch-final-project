import {Router} from 'express';
import { ProductManager } from '../dao/mongoDB/controller/productsController.js';
import { CartManager } from '../dao/mongoDB/controller/cartsController.js';

const cartManager = new CartManager();
const productManager = new ProductManager();

const viewsRouter = Router();

viewsRouter.get('/products', async (req, res) => {
    const{limit=10,page=1,category,sort}=req.query;
    const productsPage = await productManager.getProducts(limit,page,category,sort);
    const products = productsPage.docs;
    console.log(products);
    res.render('products', {products});
});

viewsRouter.get('/carts/:cid', async (req, res) => {
    const {cid} = req.params;
    const cart = await cartManager.getCartById(cid);
    console.log(cart.products);
    res.render('carts', {cart});
});

viewsRouter.get('/', async (req, res) => {
    res.render('home');
});


export default viewsRouter;

//product 63ead20eb23ac1ea82e6af6a
//cart 6400d4c75f4180068837cd23