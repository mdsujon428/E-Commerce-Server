const express = require('express');
const {
    createCategory,
    updateCategory,
    getCategory,
    getAllCategory
} = require('../controller/blogCatCtrl');
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleWare, isAdmin,createCategory);
router.put('/:id', authMiddleWare, isAdmin, updateCategory);
router.get('/:id',authMiddleWare,isAdmin,getCategory)
router.get('/',authMiddleWare,isAdmin,getAllCategory)
router.delete('/:id',authMiddleWare,isAdmin,getAllCategory)

module.exports = router;