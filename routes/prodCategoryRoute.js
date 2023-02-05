const express = require('express');
const {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
} = require('../controller/prodCategoryCtrl');
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/',authMiddleWare,isAdmin, createCategory);
router.put('/:id',authMiddleWare,isAdmin, updateCategory);
router.delete('/:id',authMiddleWare,isAdmin, deleteCategory);
router.get('/:id',authMiddleWare,isAdmin, getCategory);
router.get('/',authMiddleWare,isAdmin, getAllCategory);

module.exports = router;