const express = require('express');
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const {
    createOrder,
    getOrdersByUser,
    getAllOrders,
    getOrderById,
    changeOrderStatusAndShipperId,
    deleteOrder
} = require('../controller/orderCtrl')
router.post('/', authMiddleWare, createOrder);

router.get('/get-all-orders',authMiddleWare,isAdmin,getAllOrders)
router.get('/:id',authMiddleWare,isAdmin,getOrderById)
router.get('/', authMiddleWare, getOrdersByUser);



router.delete("/",authMiddleWare,isAdmin,deleteOrder)
module.exports = router;