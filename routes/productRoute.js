const express = require('express');
const { createProduct,getAProduct ,getAllProduct,updateProduct} = require('../controller/productCtrl');
// const { route } = require('./authRoute');
const router = express.Router();

router.post("/", createProduct);
router.get("/",getAllProduct)
router.get("/:id", getAProduct);
router.put('/:id', updateProduct);
module.exports = router