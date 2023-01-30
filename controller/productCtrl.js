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

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
        const deleteProduct = await Product.findOneAndDelete(id);
        res.json(deleteProduct)
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
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        //Filtering
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`)
      
        let query = Product.find(JSON.parse(queryStr));

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("createdAt");
        }

        //Limiting the fields
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields)
        } else {
            query = query.select('-__v')
        }

        // pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        console.log(query.limit);

        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) {
                throw new Error("This page does not exits")
            }
        }

        const products = await query;
        const total = products.length;
        res.json(products);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createProduct,
    getAProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}