import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
      },
    ],
    default: [],
  },
  role: {
    type: String,
    required: true,
  },
  documents: {
    type: [
      {
        name: String,
        reference: String,
      },
    ],
  },
  last_connection: {
    type: String,
    default: " ",
  },
});

export const usersModel = mongoose.model("Users", usersSchema);
