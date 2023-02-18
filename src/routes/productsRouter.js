import {Router} from 'express';
import { ProductManager } from '../dao/mongoDB/controller/productsController.js';
import { socketServer } from '../app.js';

const productsRouter = Router();
const productManager = new ProductManager();

productsRouter.get('/', async (req,res) => {
  const {limit,page,query,sort}=req.query;
  const products = await  productManager.getProducts(limit || 'max');
  res.json({products});
});

productsRouter.get('/:pid',async (req,res) => {
  const product = await productManager.getProductById(req.params.pid);
  res.json({product});
});

productsRouter.post('/',async (req,res) => {
  const {title,description,code,price,status,stock,category,thumbnails} = await req.body;
  const newProduct = await productManager.addProduct(title,description,code,price,status,stock,category,thumbnails);
  console.log({newProduct});
  res.json({message:"producto creado con éxito",newProduct});
  socketServer.emit('newProduct', newProduct);

});

productsRouter.put('/:pid',async (req,res) => {
  const id = req.params.pid;
  const obj = req.body;
  console.log(id,obj)
  try{
    const updatedProduct = await productManager.updateProductById(id,obj);
    res.json({message:"producto actualizado con éxito",updatedProduct});
  }catch(error){
    return(error);
  }
});

productsRouter.delete('/:pid',async (req,res) => {
  const id = req.params.pid;
  const deletedProduct = await productManager.deleteProductById(id);
  if (deletedProduct){
     res.json({message:"producto eliminado con éxito",deletedProduct});
     socketServer.emit('delProduct',id);
  } else {
    res.json({message:"producto no encontrado"})
  }
});

export default productsRouter;