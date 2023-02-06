const express = require('express');
const router = express.Router();
const {
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controller/brandCtrl');
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleware');


router.post('/', authMiddleWare, isAdmin, createCategory);
router.put('/:id', authMiddleWare, isAdmin, updateCategory);
router.delete('/:id', authMiddleWare, isAdmin, deleteCategory);


module.exports = router;