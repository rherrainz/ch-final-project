import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                pId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
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
    }
});

cartsSchema.pre('find', function(next) {
    this.populate('products.pId');
    next();
    
});

export const cartsModel = mongoose.model('carts',cartsSchema);
