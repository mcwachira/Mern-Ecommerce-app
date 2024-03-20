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
import checkObjectId from '../middleware/checkObjectId.js';
const router = express.Router()





router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);

router.get('/top', getTopProducts);
router
    .route('/:id')
    .get(checkObjectId, getProductById)
    .put(protect, admin, checkObjectId, updateProduct)
    .delete(protect, admin, checkObjectId, deleteProduct);



export default router