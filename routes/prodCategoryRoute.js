const express = require('express');
const {
    createCategory,
    updateCategory} = require('../controller/prodCategoryCtrl');
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/',authMiddleWare,isAdmin, createCategory);
router.put('/:id',authMiddleWare,isAdmin, updateCategory);

module.exports = router;