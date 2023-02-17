import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    products: {
        type: String,
        index: true,
    },    
    title: {
        type: String,
        index: true
    },
    description: {
        type: String,
    },
    code: {
        type: String,
        index: true
    },
    price: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number
    },
    category: {
        type: String,
        index: true
    },
    thumbnails: {
        type: Array,
        default: []
    }
});



export const productsModel = mongoose.model('products', productsSchema);