import { ProductMongo, ProductsMongo } from "../persistencia/dao/mongoDB/managers/productsMongo.js";

const productsMongo = new ProductsMongo();

export class ProductManager {
  async getProducts(limit, page, category, sort) {
    try {
      const products = await productsMongo.getProducts(limit, page, category, sort);
      return products
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async addProduct(obj) {
    try {
      const product = await productsMongo.addProduct(obj);
      return product;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getProductById(id) {
    try {
      const product = await productsMongo.getProductById(id);
      return product;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateProductById(id, obj) {
    try {
      const updatedProduct = productsMongo.updateProductById(id, obj);
      return updatedProduct;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteProductById(id) {
    try {
      const deletedProduct = await productsMongo.deleteProductById(id);
      return deletedProduct;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
