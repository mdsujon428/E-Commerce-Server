const Coupon = require('../models/couponModel');
const asyncHandler = require('express-async-handler');
const { validateMongodbId } = require('../utils/validateMongodbId');

// create coupon
const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon )
    } catch (error) {
        throw new Error(error)
    }
})
const getAllCoupons = asyncHandler(async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons )
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    createCoupon,
    getAllCoupons
}