const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const {validateMongoDbId} = require('../utils/validateMongodbId');


// create an order 
const createOrder = asyncHandler(async (req, res) => {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        if (!COD) throw new Error("Create cash order failed");
        const user = await User.findById(_id);
        let userCart = await Cart.findOne({ orderby: user._id });
        //console.log(userCart)
        let finalAmount = 0;
        if (couponApplied && userCart.totalAfterDiscount) {
            finalAmount = userCart.totalAfterDiscount * 100;
        } else {
            finalAmount = userCart.cartTotal * 100;
        }
        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                method: "COD",
                amount: finalAmount,
                paymentMethod: "Cash on Delivery",
                orderAt: Date.now(),
                currency: "BDT"
            },
            orderby: user._id,
        }).save();
        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update:{$inc:{quantity:-item.count,sold:+item.count}}
                }
            }
        })
        const updated = await Product.bulkWrite(update, {});
        res.status(201).json({message:"Order placed"})
    } catch (error) {
        throw new Error(error)
    }
})

// get orders by user
const getOrdersByUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const orders = await Order.find({ orderby: _id });
        if (orders.length === 0) { 
            res.status(200).json ({message:"No order found"})
        }
        res.status(200).json(orders);
    } catch (error) {
        
    }
})

const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getOrder = await Order.findById(id).populate("orderby").populate("shipperId");
        res.status(200).json(getOrder);
    } catch (error) {
        throw new Error(error);
    }
})

//get all order for admin request
const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const allOrders = await Order.find();
        res.status(200).json(allOrders);
    } catch (error) {
        throw new Error(error);
    }
})


// Delete order by admin
const deleteOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.body;
    validateMongoDbId(orderId);
    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        res.json(deletedOrder);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUser,
    getAllOrders,
    changeOrderStatusAndShipperId,
    deleteOrder
}