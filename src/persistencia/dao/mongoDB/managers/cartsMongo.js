import { cartsModel } from "../models/cartsModel.js";

export class CartsMongo {
  async getCarts() {
    try {
      const infoCarts = await cartsModel.find();
      return infoCarts;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async getCartById(id) {
    try {
      const cart = await cartsModel.findById(id).lean();
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async addCart() {
    try {
      const cart = {
        products: [],
      };
      const newCart = await cartsModel.create(cart);
      await newCart.save();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async updateCartById(id, products) {
    try {
      const updatedCart = await cartsModel.findByIdAndUpdate(id, { products });
      return updatedCart;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async deleteCartById(id) {
    try {
      const deletedCart = await cartsModel.findByIdAndDelete(id);
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
      const cart = await this.getCartById(id);
      const product = cart.products.find((product) => product._id == pid);
      if (!cart) {
        return console.log("Cart not found");
      } else {
        product.quantity = quantity;
        cart.save();
        return cart;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async deleteCart(cid) {
    try {
      const cart = await cartsModel.findByIdAndDelete(cid);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductFromCart(cId, pId) {
    try {
      const cart = await cartsModel.findById(cId);
      cart.products = cart.products.filter((p) => p.product != pId);
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
  async emptyCart(cId) {
    try {
      const cart = await cartsModel.findById(cId);
      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
}
