import mongoose from "mongoose";
import "dotenv/config";

const URI = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

try {
  mongoose.connect(URI);
  console.log("Conectado a la base de datos");
} catch (error) {
  console.log("Error al conectarse a la base de datos", error);
}
