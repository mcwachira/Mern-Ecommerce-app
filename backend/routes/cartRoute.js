const express = require('express')

const router = express.Router()





const { verifyToken, verifyAdmin } = require('../middleware/auth')

const {
    createCart,
    updateCart,
    deleteCart,
    getCartList,
    userCartById,
    getCartStats

} = require('../controllers/cartController')


//create Cart 
router.post('/cart/create', verifyToken, createCart)



//updating cart
router.put('/cart/:id', verifyToken, updateCart)

//get a specific  cart based on user id
router.get('/cart/find/:userId', verifyToken, userCartById)

//delete cart
router.delete('/cart/:id', verifyToken, deleteCart)

//get all carts
router.get('/cart/find', verifyAdmin, getCartList)




//get cart stats

router.get('/cart/stats', verifyAdmin, getCartStats)
module.exports = router