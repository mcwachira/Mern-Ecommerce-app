import express from 'express'
import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js'
import {getProductById, getProducts} from "../controllers/ProductController.js";
const router = express.Router()


// router.get('/', (req, res) => {
//     res.send('Api is running ....')
// })


router.get('/products',getProducts);

router.get('/products/:id', getProductById);



export default router