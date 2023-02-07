const express = require('express');
const {
    createProduct,
    getAProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishList,
    rating} = require('../controller/productCtrl');
const {authMiddleWare,isAdmin} = require('../middlewares/authMiddleware')
// const { route } = require('./authRoute');
const router = express.Router();

router.get("/", getAllProduct);
router.post("/",authMiddleWare,isAdmin, createProduct);
router.put('/wishlist',authMiddleWare, addToWishList);
router.put('/rating',authMiddleWare, rating);
router.get("/:id",authMiddleWare,isAdmin, getAProduct);
router.put('/:id',authMiddleWare,isAdmin, updateProduct);
router.delete('/:id',authMiddleWare,isAdmin, deleteProduct);
module.exports = router