const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const {validateMongoDbId} = require('../utils/validateMongodbId')

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
        //console.log(update)
        const updated = await Product.bulkWrite(update, {});
        //await Cart.findByIdAndDelete(userCart._id)
        //console.log(updated)
        res.status(201).json({message:"Order placed"})
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    createOrder
}