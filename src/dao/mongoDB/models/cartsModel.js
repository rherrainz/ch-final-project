import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
    products: {
        pId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            index: true
        },
        quantity:{
            type: Number
        },
        default: []
    }
});

export const cartsModel = mongoose.model('carts',cartsSchema);