const express = require('express');
const router = express.Router();
const {
    createCoupon,
    getAllCoupons,
    updateCoupons,
    deleteCoupons,
    applyCoupon
} = require('../controller/couponCtrl');
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', authMiddleWare, isAdmin, createCoupon);
router.post('/apply-coupon',authMiddleWare,applyCoupon)
router.get('/', authMiddleWare, isAdmin, getAllCoupons);
router.put('/:id', authMiddleWare, isAdmin,updateCoupons);
router.delete('/:id', authMiddleWare, isAdmin,deleteCoupons);

module.exports = router;