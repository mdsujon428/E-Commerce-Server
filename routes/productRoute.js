const express = require('express');
const {
    createProduct,
    getAProduct,
    getAllProduct,
    updateProduct,
    deleteProduct } = require('../controller/productCtrl');
const {authMiddleWare,isAdmin} = require('../middlewares/authMiddleware')
// const { route } = require('./authRoute');
const router = express.Router();

router.get("/", getAllProduct);
router.post("/",authMiddleWare,isAdmin, createProduct);
router.get("/:id",authMiddleWare,isAdmin, getAProduct);
router.put('/:id',authMiddleWare,isAdmin, updateProduct);
router.delete('/:id',authMiddleWare,isAdmin, deleteProduct);
module.exports = router