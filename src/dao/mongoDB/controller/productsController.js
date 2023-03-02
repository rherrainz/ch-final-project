import { productsModel } from "../models/productsModel.js";

export class ProductManager {
  async getProducts(limit, page, category, sort) {
    try {
      
      if (!category) {
        const products = await productsModel.paginate(
          {},
          { limit, page, sort, lean: true }
        );
        return products;
      } else {
        const products = await productsModel.paginate(
          { category },
          { limit, page, sort ,lean: true }
        );
        return products;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  ) {
    try {
      const product = {
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: [],
      };
      const newProduct = await productsModel.create(product);
      return newProduct;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getProductById(id) {
    try {
      const product = await productsModel.findById(id);
      return product;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateProductById(id, obj) {
    try {
      const updatedProduct = productsModel.findByIdAndUpdate(id, obj);
      return updatedProduct;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteProductById(id) {
    try {
      const deletedProduct = await productsModel.findByIdAndDelete(id);
      return deletedProduct;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
