const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')



const createProduct = asyncHandler(async (req, res) => {
    const { name, desc, price, img, categories, size, color, inStock } = req.body

    //first thing is to check the data

    // if (!name || !email || !password) {
    //     return res.status(400).json({ message: 'all fields are required' })
    // }

    //check for existing user or duplicates
    //.exec() enables use to get a promise back
    // const duplicateUser = await User.findOne({ email }).lean().exec()
    // if (duplicateUser) {
    //     return res.status(409).json({ message: 'user with that email already in use' })
    // }

    //hash the password
    // const hashedPassword = await bcrypt.hash(password, 10) //salt rounds 10

    const productObject = {
        name,
        desc, price, img, categories, size, color, inStock

    }
    const product = await Product.create(productObject)

    if (product) {
        res.status(201).json(product)
    } else {

        res.status(400).json({ message: 'product not created . invalid product data' })
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id


    const { name, desc, price, img, categories, size, color, inStock } = req.body

    //check if username is already in use
    // const duplicateUser = await User.findOne({ username }).lean().exec()
    // if (duplicateUser && duplicateUser?._id.toString() !== id) {
    //     return res.status(409).json({ message: 'Username already in use' })
    // }

    // if (!name || !email) {
    //     return res.status(400).json({ message: 'all fields are required' })
    // }

    //check id the user exist
    const product = await Product.findById(id).exec()

    if (!product) {
        return res.status(400).json({ message: ' No product with that id exits' })
    }



    //update the product details
    const updatedProductDetails = {
        name: name,
        desc: desc,
        price: price,
        img: img,
        categories: categories,
        size: size,
        color: color,
        inStock: inStock

    }

    const updatedProduct = await Product.findByIdAndUpdate(
        id, updatedProductDetails, {
        new: true
    })

    res.status(200).json(updatedProduct)
})


//delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    const product = await Product.findByIdAndDelete(id)


    if (!product) {
        res.status(400).json({ message: ' No user with that id exits' })
    }
    res.status(200).json({ message: 'user deleted successfully' })
})


//get list of users 
const getProductList = asyncHandler(async (req, res) => {


    const queryNew = req.query.new
    const queryCategory = req.query.Category
    let products;

    if (queryNew) {
        products = await Product.find().sort({ createdAt: -1 })
    } else if (queryCategory) {

        products = await Product.find({
            categories: {
                $in: [queryCategory]
            }
        })
    } else {
        products = await Product.find()
    }


    if (!products) {
        res.status(400).json({ message: 'no products found' })
    }

    res.status(200).json(products)
})


const getProductById = asyncHandler(async (req, res) => {

    const id = req.params.id
    console.log(id)
    let product = await Product.findById(id).exec()
    if (!product) {
        return res.status(400).json({
            error: "Product not found"
        })

    }

    res.status(200).json(product)


})

const getProductsStats = asyncHandler(async (req, res) => {

    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    const productData = await Product.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: lastYear
                }
            }
        },
        {


            $project: {
                month: {
                    $month: "$createdAt"
                },
            },

        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 }
            }
        }
    ])


    if (!productData) {
        res.status(401).json({ message: ' productData not found' })
    }

    res.status(200).json(productData)


})


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductList,
    getProductById,
    getProductsStats
}