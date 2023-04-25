import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                pId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: 1,
                    required: true
                }
            }
        ],
        default: []
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    code:{
        type: String,
        default: Date.now
    },
    purchase_datetime:{
        type: Date,
        default: Date.now
    },
    amount:{
        type: Number,
        default: 0
    },
    purchaser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    } 


});


export const ticketsModel = mongoose.model("tickets", ticketsSchema);