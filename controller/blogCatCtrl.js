const blogCategory = require('../models/blogCatModel');
const asyncHandler = require('express-async-handler');
const {validateMongoDbId} = require('../utils/validateMongodbId');

// create blog category
const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await blogCategory.create(req.body);
        res.json(newCategory)
    } catch (error) {
        throw new Error(error);
    }
})

// update blog category
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateCategory = await blogCategory.findByIdAndUpdate(id, req.body, {
            new:true
        });
        res.json(updateCategory)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createCategory,
    updateCategory,
}