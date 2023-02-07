const express = require('express');
const router = express.Router();
const {
    createCoupon,
    getAllCoupons
} = require('../controller/couponCtrl');
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', authMiddleWare, isAdmin, createCoupon);
router.get('/', authMiddleWare, isAdmin, getAllCoupons);

module.exports = router;