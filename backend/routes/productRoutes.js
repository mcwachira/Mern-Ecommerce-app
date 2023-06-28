import express from 'express'
import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js'
import {
    createProduct,
    createProductReview,
    deleteProduct,
    getProductById,
    getProducts, getTopProducts,
    updateProduct
} from "../controllers/ProductController.js";
import {admin, protect} from "../middleware/authMiddleware.js";
const router = express.Router()





router.get('/',getProducts);

router.post('/', protect, admin, createProduct)

router.get('/:id', getProductById);

router.put('/:id', protect, admin , updateProduct);

router.get('/top', getTopProducts);

router.post('/:id/reviews', protect, createProductReview);
router.delete('/:id', protect, admin , deleteProduct);



export default router