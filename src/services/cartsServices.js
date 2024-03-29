import { CartsMongo } from "../persistencia/dao/mongoDB/managers/cartsMongo.js";

const cartsMongo = new CartsMongo;

export class CartManager {
  async getCarts() {
    try {
      const infoCarts = await cartsMongo.getCarts();
      return infoCarts;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async getCartById(id) {
    try {
      const cart = await cartsMongo.getCartById(id);
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async addCart(obj) {
    try {
      const cart = await cartsMongo.addCart(obj);
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async updateCartById(id, products) {
    try {
      const updatedCart = await cartsMongo.updateCartById(id, { products });
      return updatedCart;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async deleteCartById(id) {
    try {
      const deletedCart = await cartsMongo.findByIdAndDelete(id);
      return deletedCart;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async addProductToCart(id, pid) {
    try {
      const cart = await cartsModel.findById(id);
      const product = { product: pid };
      if (!cart) {
        return console.log("Cart not found");
      } else {
        cart.products.push(product);
        cart.save();
        return cart;
      }}
    catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }
  

  async updateProductQuantity(id, pid, quantity) {
    try {
      const cart = await cartsMongo.updateProductQuantity(id,pid,quantity);
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async deleteCart(cid) {
    try {
      const cart = await cartsMongo.deleteCart(cid);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductFromCart(cId, pId) {
    try {
      const cart = await cartsMongo.deleteProductFromCart(cId,pId);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
  async emptyCart(cId) {
    try {
      const cart = await cartsMongo.emptyCart(cId);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
}
