//for routing we will be defining the URL paths and matching them to HTTP methods
import express from 'express';
import { getAllProducts, getProductById, createProduct } from '../controllers/productController.js';

//1. create an isolated router instance for products
const router = express.Router();

//declarative route mapping
router.get('/',getAllProducts);
router.get('/:id',getProductById);
router.post('/',createProduct);

// export router instance so the main app can mount it 
export default router;