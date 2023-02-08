const express = require('express');
const router = express.Router();
const {
    createCoupon,
    getAllCoupons,
    updateCoupons

} = require('../controller/couponCtrl');
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', authMiddleWare, isAdmin, createCoupon);
router.get('/', authMiddleWare, isAdmin, getAllCoupons);
router.put('/:id', authMiddleWare, isAdmin,     updateCoupons
);

module.exports = router;