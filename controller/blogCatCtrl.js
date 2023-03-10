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

// get blog category
const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getACategory = await blogCategory.findById(id);
        res.json(getACategory)
    } catch (error) {
        throw new Error(error);
    }
})

// get all blog category
const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const getAllCategory = await blogCategory.find();
        res.json(getAllCategory)
    } catch (error) {
        throw new Error(error);
    }
})

// get all product category
const deleteACategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteCategory = await blogCategory.findByIdAndDelete(id);
        res.json(deleteCategory)
    } catch (error) {
        throw new Error(error);
    }
})


module.exports = {
    createCategory,
    updateCategory,
    getCategory,
    getAllCategory,
    deleteACategory
}