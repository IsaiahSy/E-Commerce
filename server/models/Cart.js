import mongoose from 'mongoose';
import User from './User.js';

const cartSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    productId: {
        type: String
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    data: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model("Cart", cartSchema);