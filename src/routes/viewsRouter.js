import { Router } from "express";
import { ProductController } from "../controllers/productsControllers.js";
import { CartController } from "../controllers/cartsControllers.js";
import {auth, isLogged} from '../middlewares/auth.middlewares.js'

const cartManager = new CartController();
const productManager = new ProductController();

const viewsRouter = Router();

viewsRouter.get("/products", async (req, res) => {
  const { limit = 10, page = 1, category, sort } = req.query;
  const productsPage = await productManager.getProducts(
    limit,
    page,
    category,
    sort
  );
  const email = req.session.email;
  console.log(email);
  const products = productsPage.docs;
  res.render("products", { products,email });
});

viewsRouter.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  console.log(cart.products);
  res.render("carts", { cart });
});

viewsRouter.get("/", async (req, res) => {
  res.render("login");
});

viewsRouter.get('/registro',isLogged, (req, res) => {
    res.render('registro',{email: req.session.email});
});

viewsRouter.get('/errorRegistro', (req, res) => {
    res.render('errorRegistro');
})

viewsRouter.get('/login',isLogged, (req, res) => {
    res.render('login');
});

viewsRouter.get('/perfil',auth, (req, res) => {
    res.render('perfil',{email: req.session.email});
});

viewsRouter.get('/errorLogin', (req, res) => {
    res.render('errorLogin');
});

viewsRouter.get('/resetpassword', (req, res) => {
  res.render('resetpassword')
})

viewsRouter.get('/passwordchanged', (req, res) => {
  const { token } = req.query
  res.render('passwordchanged', { token })
})

viewsRouter.get('/expiredtoken', (req, res) => {
  res.render('expiredtoken')
})

export default viewsRouter;

//product 63ead20eb23ac1ea82e6af6a
//cart 6400d4c75f4180068837cd23
