import mongoose from "mongoose";
import {config} from '../config.js';

const URI = config.mongoUri;

mongoose.set("strictQuery", false);

try {
  mongoose.connect(URI);
  console.log("Conectado a la base de datos");
} catch (error) {
  console.log("Error al conectarse a la base de datos", error);
}
