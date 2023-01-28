const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify')

// create product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify( req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct)
    } catch (error) {
       
        throw new Error(error)
    }
})

// update product
const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findOneAndUpdate({ id }, req.body, { new: true });
        res.json(updateProduct)
    } catch (error) {
        throw new Error(error);
    }
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

module.exports ={createProduct,getAProduct,getAllProduct,updateProduct }