const express = require('express')

const router = express.Router()

const { verifyToken, verifyAdmin } = require('../middleware/auth')

const {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderList,
    userOrderById,
    getOrderStats

} = require('../controllers/orderController')


//create Cart 
router.post('/orders/create', verifyToken, createOrder)



//updating order
router.put('/orders/:id', verifyAdmin, updateOrder)

//get a specific  order based on user id
router.get('/orders/find/:userId', verifyToken, userOrderById)

//delete order
router.delete('/orders/:id', verifyAdmin, deleteOrder)

//get all orders
router.get('/orders/find', verifyAdmin, getOrderList)

//get all amount
router.get('/orders/income', verifyAdmin, getOrderStats)




//get order stats

router.get('/orders/stats', verifyAdmin, getOrderStats)
module.exports = router