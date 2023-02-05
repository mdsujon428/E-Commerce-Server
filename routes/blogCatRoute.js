const express = require('express');
const {
    createCategory, 
} = require('../controller/blogCatCtrl');
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleWare, isAdmin,createCategory);

module.exports = router;