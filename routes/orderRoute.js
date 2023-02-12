const express = require('express');
const { authMiddleWare } = require('../middlewares/authMiddleware');
const router = express.Router();
const {
    createOrder
} = require('../controller/orderCtrl')
router.post('/', authMiddleWare, createOrder);

module.exports = router;