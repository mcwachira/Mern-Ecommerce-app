const express = require('express')

const router = express.Router()


const { verifyToken, verifyAdmin } = require('../middleware/auth')

const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductList,
    getProductById,
    getProductsStats

} = require('../controllers/productController')


//create Product 
router.post('/products/create', createProduct)



//updating product
router.put('/products/update/:id', verifyToken, updateProduct)

//delete product
router.delete('/products/delete/:id', verifyToken, deleteProduct)

//get all products
router.get('/products/', getProductList)

//get a specific  product based on id
router.get('/products/:id', getProductById)


//get product stats

router.get('/products/stats', verifyAdmin, getProductsStats)
module.exports = router