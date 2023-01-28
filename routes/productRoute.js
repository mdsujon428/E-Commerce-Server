const express = require('express');
const { createProduct,getAProduct ,getAllProduct} = require('../controller/productCtrl');
// const { route } = require('./authRoute');
const router = express.Router();

router.post("/", createProduct);
router.get("/",getAllProduct)
router.get("/:id", getAProduct);
module.exports = router