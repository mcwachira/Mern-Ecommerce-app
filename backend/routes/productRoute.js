const express = require('express');
const router = express.Router()
const { isAuth, isAdmin, requireSignIn } = require('../controllers/authController')
const { createProduct,
    getProducts,
    read,
    getProductById,
    productById,
    updateProduct,
    deleteProduct } = require('../controllers/productController')

const {
    getUserById,

} = require('../controllers/userController')



router.post('/products/create/:userId', isAdmin, createProduct)
router.get('/products/', getProducts)

//router.get('products/:productId', getProductById)
router.get('/products/:productId', read)

router.put('products/:productId', isAdmin, updateProduct)

router.delete('/products/:productId/:userId', isAdmin, deleteProduct)
router.param('/userId', getUserById)
router.param('/productId', getProductById)


module.exports = router