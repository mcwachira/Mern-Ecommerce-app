import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../models/orderModel.js'

//@desc Create A new Order
//route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async  (req, res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,

    } = req.body

    if(orderItems  && orderItems.length === 0){
        res.status(400)
        throw new Error('No Order Item ')
    }else {


        const order = new Order({
            orderItems: orderItems.map((x) =>
                ({...x, product: x._id, _id: undefined})),

            shippingInfo,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id
        })

        const createOrder = await order.save()
        res.status(201).json({
            success: true,
            createOrder
        })
    }
})



//@desc Get my Orders
//route Get/api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async  (req, res) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})

//@desc Get Order By Id Order
//@route Get Order By Id /api/orders/:id
//@access Private
const  getOrderById = asyncHandler(async  (req, res) => {


    const id = req.params.id




    const order = await Order.findById(id).populate('user', 'name email')

    if(!order){
        res.status(404)
        throw new Error('Order with that id not found')
    }


    res.status(200).json({
        success:true,
        message:'Order with id found',
        order

    })

})

//@desc updateOrder
//route  Get /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async  (req, res) => {


    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email


        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin
            }
        )
    }else{
        res.status(404)
        throw new Error('user not found')
    }
})

//@desc updateOrder
//route  Get /api/orders/:id/delivered
//@access Private Admin
const updateOrderToDelivered = asyncHandler(async  (req, res) => {


    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email


        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin
            }
        )
    }else{
        res.status(404)
        throw new Error('user not found')
    }
})

//@desc Get All Orders
//@route Delete /api/users/:id
//@access Private Admin
const getAllOrders =  asyncHandler(async(req, res) => {
    //number of orders tro display per page


    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    console.log(totalAmount)
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
});


//@desc Delete User
//@route Delete /api/users/:id
//@access Private Admin
const deleteOrder =  asyncHandler(async(req, res) => {
    const user =await  User.findById(req.params.id )

});
export {getMyOrders, addOrderItems, getOrderById , getAllOrders,updateOrderToDelivered , updateOrderToPaid, deleteOrder}
