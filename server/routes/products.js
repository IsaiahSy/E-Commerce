import express from 'express';
import * as productsController from '../controllers/products.js';

const router = express.Router();

router.get('/', productsController.fetchAll);
router.get('/:id', productsController.getProduct);

export default router;