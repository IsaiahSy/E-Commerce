import express from 'express';
import auth from '../middleware/auth.js';
import * as cartControllers from '../controllers/cart.js';

const router = express.Router();

router.get('/', auth, cartControllers.getCartList);
router.post('/add', auth, cartControllers.addCartItem);

export default router;