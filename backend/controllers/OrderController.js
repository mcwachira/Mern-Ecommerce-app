import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../models/orderModel.js'


// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});



//@desc Get my Orders
//route Get/api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async  (req, res) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json(  orders)
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc updateOrder
//route  Get /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async  (req, res) => {


    const order = await Order.findById(req.params.id);

    console.log(order)
    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            update_time :req.body.update_time,
            email_address :req.body.payer.email_address
        }

        const  updatedOrder = await order.save()

        res.status(200).json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('order not found ')
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
