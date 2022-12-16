const Cart = require('../models/Cart')
const asyncHandler = require('express-async-handler')



const createCart = asyncHandler(async (req, res) => {
    const cart = await Cart.create(req.body)

    if (cart) {
        res.status(201).json(cart)
    } else {

        res.status(400).json({ message: 'cart not created . invalid cart data' })
    }
})

const updateCart = asyncHandler(async (req, res) => {
    const id = req.params.id

    //check id the cart exist
    const cart = await Cart.findById(id).exec()

    if (!cart) {
        return res.status(400).json({ message: ' No cart with that id exits' })
    }



    const updatedCart = await Cart.findByIdAndUpdate(
        id, req.body, {
        new: true
    })

    res.status(200).json(updatedCart)
})


//delete cart 
const deleteCart = asyncHandler(async (req, res) => {
    const id = req.params.id
    const cart = await Cart.findByIdAndDelete(id)


    if (!cart) {
        res.status(400).json({ message: ' No cart  with that id exits' })
    }
    res.status(200).json({ message: 'cart  deleted successfully' })
})





const userCartById = asyncHandler(async (req, res) => {

    const id = req.params.userId
    console.log(id)
    let cart = await Cart.findOne({ id }).exec()
    if (!cart) {
        return res.status(400).json({
            error: "Cart not found"
        })

    }

    res.status(200).json(cart)


})

//get list of carts
const getCartList = asyncHandler(async (req, res) => {

    const cart = await Cart.find()


    if (!cart) {
        res.status(400).json({ message: 'no cart found' })
    }

    res.status(200).json(cart)
})

const getCartStats = asyncHandler(async (req, res) => {

    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    const cartData = await Cart.aggregate([
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
    createCart,
    updateCart,
    deleteCart,
    getCartList,
    userCartById,
    getCartStats
}