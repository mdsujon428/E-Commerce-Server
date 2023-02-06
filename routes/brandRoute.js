const express = require('express');
const router = express.Router();
const {
    createCategory
} = require('../controller/brandCtrl');
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleware');


router.post('/', authMiddleWare, isAdmin, createCategory);


module.exports = router;