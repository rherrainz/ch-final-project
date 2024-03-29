import express from "express";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import sessionRouter from "./routes/sessionRouter.js";
import usersRouter from "./routes/usersRouter.js";
import mailRouter from "./routes/mailRouter.js";
import productsMocksRouter from "./routes/productsMocksRouter.js";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import { __dirname } from "./utils.js";
import {errorMiddleware} from "./middlewares/errors/middleware.js";
import './dbConfig.js'
import config from './config.js'
import './passport/passportStrategies.js'
import './utils.js'

const app = express();

//configuración
const PORT = config.port || 8080;


//configuración de app()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');
app.use(cookieParser());

//session
app.use(session({
  store: new mongoStore({
    mongoUrl: config.mongoUri,
  }),
  resave: false,
  saveUninitialized: false,
  secret: config.sessionSecret,
  cookie: {maxAge:60000}  
}));

//rutas
app.use("/", viewsRouter);
app.get("/realtimeproducts", async (req, res) => {
  res.render('realTimeProducts');
});
app.use("/api/products", productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/session', sessionRouter);
app.use('/users', usersRouter);
app.use('', productsMocksRouter);
app.use('/email', mailRouter);

//middlewares
app.use(errorMiddleware);

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