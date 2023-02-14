import express from "express";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import handlebars from "express-handlebars";
import { dirname} from "path";
import { fileURLToPath } from "url";
import {Server} from "socket.io";
import {ProductManager} from "./dao/fileSystem/controller/productsController.js";
import './dbConfig.js'

const app = express();

//configuración
const PORT = 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

app.get("/", async (req, res) => {
    
    const productManager = new ProductManager(__dirname+'/db/productsDB.json');
    const products = await productManager.getProducts();
  
    res.render("home", {products});
});

app.get("/realtimeproducts", async (req, res) => {
  res.render('realTimeProducts');
});
app.use("/api/products", productsRouter);
app.use('/api/carts', cartsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  console.log(`Client connected ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Client disconnected ${socket.id}`);
  });
  socket.on('newProduct', (data) => {
    
    socketServer.emit('newProduct', data);
  });
  socket.on('delProduct', (data)=>{
    
    socketServer.emit('delProduct',data)
  });
});