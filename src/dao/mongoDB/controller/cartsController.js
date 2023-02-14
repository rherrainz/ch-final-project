import { cartsModel } from "../models/cartsModel.js";

export class CartManager {
    async getCarts(limit) {
        try {
            if (limit === "max") {
                const infoCarts = await cartsModel.find();
                return infoCarts;
            } else {
                const infoCarts = await cartsModel.find().limit(limit);
                return infoCarts;
            }
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
    async getCartById(id) {
        try{
            const cart = await cartsModel.findById(id);
            return cart;
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }
    async updateCartById(id, products) {
        try{
            const updatedCart = await cartsModel.findByIdAndUpdate(id, {products});
            return updatedCart;
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }
    async deleteCartById(id) {
        try{
            const deletedCart = await cartsModel.findByIdAndDelete(id);
            return deletedCart;
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }
    async addProductToCart(id, pid) {
        try{
            const cart = await this.getCartById(id);
            const product = pid;
            if (!cart) {
                return console.log("Cart not found");
            }else {
               cart.products.push(product);
               cart.save();
            }
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }
}
