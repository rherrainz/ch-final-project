import {Router} from 'express';
import { CartManager } from '../dao/mongoDB/controller/cartsController.js';

const cartRouter = Router();
const cartManager = new CartManager();

//get all carts
cartRouter.get('/', async(req,res) => {
    const carts = await cartManager.getCarts();
    res.json({carts});  
});

//get one cart by id
cartRouter.get('/:cid', async(req,res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    res.json({cart});
  
});

//add a new cart
cartRouter.post('/', async(req,res) => {
    const newCart = await cartManager.addCart();
    res.json({message:"carrito creado con éxito",newCart});
  
});

//update a cart by id
cartRouter.put('/:cid', async(req,res) => {
    const id = req.params.cid;
    const obj = req.body;
    try{
      const updatedCart = await cartManager.updateCartById(id,obj);
      res.json({message:"carrito actualizado con éxito",updatedCart});
    }catch(error){
      return(error);
    }
});

//update a product quantity in a cart by id
cartRouter.put('/:cid/product/:pid',async(req,res) => {
    const {cid,pid} = req.params
    const quantity = req.body.quantity;
    const updatedCart = await cartManager.updateProductQuantity(cid,pid,quantity);
    res.json({message:"carrito actualizado con éxito",updatedCart});
})

//delete a cart by id
cartRouter.delete('/:cid',async(req,res) => {
    const id = req.params.cid;
    const deletedCart = await cartManager.deleteCartById(id);
    if (deletedCart){
       res.json({message:"carrito eliminado con éxito",deletedCart});
    } else {
      res.json({message:"carrito no encontrado"})
    }
});

//delete a product from a cart by id
cartRouter.delete('/:cid/product/:pid',async(req,res) => {
    const {cid,pid} = req.params
    const deletedProduct = await cartManager.deleteProductFromCartById(cid,pid);
    if (deletedProduct){
       res.json({message:"producto eliminado con éxito",deletedProduct});
    } else {
      res.json({message:"producto no encontrado"})
    }
});

//add a product to a cart by id
cartRouter.post('/:cid/product/:pid',async(req,res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  //const quantity = req.body.quantity;
  const newProduct = await cartManager.addProductToCart(cid,pid);
  res.json({message:"producto agregado con éxito",newProduct});
});
//update a product quantity in a cart by id
cartRouter.put('/:cid/product/:pid',async(req,res) => {
    const {cid,pid} = req.params
    const quantity = req.body.quantity;
    const updatedCart = await cartManager.updateProductQuantity(cid,pid,quantity);
    res.json({message:"carrito actualizado con éxito",updatedCart});
});



export default cartRouter;