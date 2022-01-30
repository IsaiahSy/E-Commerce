import mongoose from 'mongoose';
import Cart from './Cart.js';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['pending', 'active'],
        default: 'pending'
    },
    confirmationCode: {
        type: String,
        unique: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    date: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model("User", userSchema);