import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
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

productsSchema.plugin(mongoosePaginate);    

export const productsModel = mongoose.model('products', productsSchema);