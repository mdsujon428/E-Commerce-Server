const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');


// create product
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

// get a product
const getAProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
      try {
          const getAProduct = await Product.findById(id);
          res.json(getAProduct);
      } catch (error) {
        throw new Error(error)
      }
})

// get all product
const getAllProduct = asyncHandler(async(req, res) =>{
    try {
        const getProducts = await Product.find();
        res.json(getProducts);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports ={createProduct,getAProduct,getAllProduct }