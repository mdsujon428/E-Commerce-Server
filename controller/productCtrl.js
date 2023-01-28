const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

const createProduct = asyncHandler(async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct)
    } catch (error) {
        // console.log(error)
        throw new Error(error)
    }
    console.log("Hello product ctrl is ready.")
})

module.exports ={createProduct }