import mongoose from "mongoose";
import config from './config.js';

const URI = config.mongoUri;

mongoose.set("strictQuery", false);

try {
  mongoose.connect(URI);
  console.log("Database connected");
} catch (error) {
  console.log("Error: Database not connected: ", error);
}
