const Order = require('../models/Order')
const asyncHandler = require('express-async-handler')



const createOrder = asyncHandler(async (req, res) => {
    const order = await Order.create(req.body)

    if (order) {
        res.status(201).json(order)
    } else {

        res.status(400).json({ message: 'order not created . invalid order data' })
    }
})

const updateOrder = asyncHandler(async (req, res) => {
    const id = req.params.id

    //check id the order exist
    const order = await Order.findById(id).exec()

    if (!order) {
        return res.status(400).json({ message: ' No order with that id exits' })
    }



    const updatedOrder = await Order.findByIdAndUpdate(
        id, req.body, {
        new: true
    })

    res.status(200).json(updatedOrder)
})


//delete order 
const deleteOrder = asyncHandler(async (req, res) => {
    const id = req.params.id
    const order = await Order.findByIdAndDelete(id)


    if (!order) {
        res.status(400).json({ message: ' No order  with that id exits' })
    }
    res.status(200).json({ message: 'order  deleted successfully' })
})





const userOrderById = asyncHandler(async (req, res) => {

    const id = req.params.userId
    console.log(id)
    let order = await Order.find({ id }).exec()
    if (!order) {
        return res.status(400).json({
            error: "Order not found"
        })

    }

    res.status(200).json(order)


})

//get list of orders
const getOrderList = asyncHandler(async (req, res) => {

    const order = await Order.find()


    if (!order) {
        res.status(400).json({ message: 'no order found' })
    }

    res.status(200).json(order)
})

const getOrderStats = asyncHandler(async (req, res) => {

    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    const income = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: previousMonth //greater than
                }
            }
        },
        {


            $project: {
                month: {
                    $month: "$createdAt"
                },

                sales: "$amount"
            },

        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" }
            }
        }
    ])


    if (!income) {
        res.status(401).json({ message: ' income not found' })
    }

    res.status(200).json(income)


})


module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderList,
    userOrderById,
    getOrderStats
}