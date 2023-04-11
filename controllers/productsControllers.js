import { ProductManager } from "../src/services/productsServices";

const productManager = new ProductManager();

export class ProductController {
  async getProducts(req, res) {
    const { limit = 10, page = 1, category, sort } = req.query;
    const products = await productManager.getProducts(
      limit,
      page,
      category,
      sort
    );

    res.json({
      status: products.docs ? "success" : "error",
      products: products.docs,
      totalPages: products.totalPages,
      prevPage: products.hasPrevPage ? products.prevPage : null,
      nextPage: products.hasNextPage ? products.nextPage : null,
      page: products.page,
      hasPrevPage: products.hasPrevPage ? true : false,
      hasNextPage: products.hasNextPage ? true : false,
      prevLink: products.hasPrevPage
        ? `http://localhost:8080/api/products?limit=${limit}&page=${products.prevPage}`
        : null,
      nextLink: products.hasNextPage
        ? `http://localhost:8080/api/products?limit=${limit}&page=${products.nextPage}`
        : null,
    });
  }

  async getProductById(req, res) {
    const product = await productManager.getProductById(req.params.pid);
    res.json({ product });
  }

  async addProduct(req, res) {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = await req.body;
    const newProduct = await productManager.addProduct(
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    );
    console.log({ newProduct });
    res.json({ message: "producto creado con éxito", newProduct });
   }

  async updateProductById(req, res) {
    const id = req.params.pid;
    const obj = req.body;
    console.log(id, obj);
    try {
      const updatedProduct = await productManager.updateProductById(id, obj);
      res.json({ message: "producto actualizado con éxito", updatedProduct });
    } catch (error) {
      return error;
    }
  }

    async deleteProductById(req, res) {
        const id = req.params.pid;
        const deletedProduct = await productManager.deleteProductById(id);
        if (deletedProduct){
           res.json({message:"producto eliminado con éxito",deletedProduct});
        } else {
          res.json({message:"producto no encontrado"})
        } 
    }
}
