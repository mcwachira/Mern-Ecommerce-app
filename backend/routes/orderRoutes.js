import express from 'express'
import asyncHandler from "../middleware/asyncHandler.js";
import {getMyOrders, addOrderItems, getOrderById , getAllOrders,updateOrderToDelivered , updateOrderToPaid, deleteOrder} from "../controllers/OrderController.js";

import { protect , admin} from '../middleware/authMiddleware.js'
const router = express.Router()


router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders);

router.route('/mine').get(protect, getMyOrders);

router.route('/:id').get(protect,  getOrderById);

router.route('/:id/pay').put(protect, updateOrderToPaid);

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router