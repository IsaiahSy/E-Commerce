import Cart from '../models/Cart.js';
import User from '../models/User.js';

export const getCartList = async (req, res) => {
    try {
        if(!req.userId) return res.sendStatus(401);
       
        const products = await Cart.find({ userId: req.userId });
        
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const addCartItem = async (req, res) => {
    const { name, price, productId } = req.body;
    try {
        if(!req.userId) return res.sendStatus(401);

        const newProduct = await Cart.create({
            name,
            price,
            productId,
            userId: req.userId
        });
        
        await User.updateOne({ _id: req.userId }, {$push: { cart: newProduct._id }});

        res.status(201).json({ message: "Successfully added on your cart." });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const deleteCartItem = async (req, res) => {
    const { productId } = req.body;
    try {
        await Cart.deleteOne({ _id: productId });
        res.status(204);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}