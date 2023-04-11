import { CartManager } from "../src/services/cartsServices";

const cartManager = new CartManager();

export class CartController {
  async getCarts(req, res) {
    try {
      const infoCarts = await cartManager
        .getCarts()
        .populate("products")
        .lean();
      res.status(200).json(infoCarts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getCartById(req, res) {
    const cart = await cartManager
      .getCartById(req.params.cid)
      .populate("products")
      .lean();
    res.json({ cart });
  }

  async addCart(req, res) {
    const newCart = await cartManager.addCart();
    res.json({ message: "carrito creado con éxito", newCart });
  }

  async updateCartById(req, res) {
    const id = req.params.cid;
    const obj = req.body;
    try {
      const updatedCart = await cartManager.updateCartById(id, obj);
      res.json({ message: "carrito actualizado con éxito", updatedCart });
    } catch (error) {
      return error;
    }
  }

  async updateQuantityById(req, res) {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity;
    const updatedCart = await cartManager.updateProductQuantity(
      cid,
      pid,
      quantity
    );
    res.json({ message: "carrito actualizado con éxito", updatedCart });
  }

  async deleteCartById(req, res) {
    const id = req.params.cid;
    const deletedCart = await cartManager.deleteCartById(id);
    if (deletedCart) {
      res.json({ message: "carrito eliminado con éxito", deletedCart });
    } else {
      res.json({ message: "carrito no encontrado" });
    }
  }

  async deleteProductFromCartById(req, res) {
    const { cid, pid } = req.params;
    const deletedProduct = await cartManager.deleteProductFromCartById(
      cid,
      pid
    );
    if (deletedProduct) {
      res.json({ message: "producto eliminado con éxito", deletedProduct });
    } else {
      res.json({ message: "producto no encontrado" });
    }
  }

  async addProductToCartById(req, res) {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const newProduct = await cartManager.addProductToCart(cid, pid);
    res.json({ message: "producto agregado con éxito", newProduct });
  }
  
  async updateProductQuantityInCartById(req, res) {

    const {cid,pid} = req.params
    const quantity = req.body.quantity;
    const updatedCart = await cartManager.updateProductQuantity(cid,pid,quantity);
    res.json({message:"carrito actualizado con éxito",updatedCart});
  }
}
