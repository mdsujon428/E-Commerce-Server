const prodCategory = require('../models/prodCategoryModel.js');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');

// create product category
const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await prodCategory.create(req.body);
        res.json(newCategory)
    } catch (error) {
        throw new Error(error);
    }
})

// update product category
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateCategory = await prodCategory.findByIdAndUpdate(id, req.body, {
            new:true
        });
        res.json(updateCategory)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports ={createCategory,updateCategory}