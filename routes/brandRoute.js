const express = require('express');
const router = express.Router();
const {
    createCategory,
    updateCategory
} = require('../controller/brandCtrl');
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleware');


router.post('/', authMiddleWare, isAdmin, createCategory);
router.put('/:id', authMiddleWare, isAdmin, updateCategory);


module.exports = router;