const express = require('express');
const router = express.Router();
const {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
} = require('../controller/brandCtrl');
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleware');


router.post('/', authMiddleWare, isAdmin, createCategory);
router.put('/:id', authMiddleWare, isAdmin, updateCategory);
router.delete('/:id', authMiddleWare, isAdmin, deleteCategory);
router.get('/:id', authMiddleWare, isAdmin, getCategory);
router.get('/', authMiddleWare, isAdmin, getAllCategory);


module.exports = router;