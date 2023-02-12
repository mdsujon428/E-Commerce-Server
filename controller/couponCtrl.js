const Coupon = require('../models/couponModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const asyncHandler = require('express-async-handler');
const { validateMongoDbId } = require('../utils/validateMongodbId');

// create coupon
const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon )
    } catch (error) {
        throw new Error(error)
    }
})

// get all coupon
const getAllCoupons = asyncHandler(async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons )
    } catch (error) {
        throw new Error(error)
    }
})
// update  coupon
const updateCoupons = asyncHandler(async (req, res) => {
    const { id } = req.params;
   validateMongoDbId(id);
    try {
        const updateCoupon = await Coupon.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updateCoupon )
    } catch (error) {
        throw new Error(error)
    }
})
// delete  coupon
const deleteCoupons = asyncHandler(async (req, res) => {
    const { id } = req.params;
   validateMongoDbId(id);
    try {
        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deleteCoupon )
    } catch (error) {
        throw new Error(error)
    }
})

// Apply coupon to get discount
const applyCoupon = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { coupon } = req.body;
    validateMongoDbId(_id);

    const user = await User.findById(_id);
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) throw new Error('Invalid Error..!')
    const { cartTotal } = await Cart.findOne({
        orderby: user._id
    })
    const totalAfterDiscount = cartTotal -  (cartTotal * validCoupon.discount) / 100;
    await Cart.findOneAndUpdate(
        { orderby: user._id },
        { totalAfterDiscount },
        { new: true }
    );
    res.json(totalAfterDiscount)
})

module.exports = {
    createCoupon,
    getAllCoupons,
    updateCoupons,
    deleteCoupons,
    applyCoupon
}