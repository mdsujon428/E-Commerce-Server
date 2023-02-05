const prodCategory = require('../models/prodCategoryModel.js');
const asyncHandler = require('express-async-handler');
const {validateMongoDbId} = require('../utils/validateMongodbId');

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
    validateMongoDbId(id);
    try {
        const updateCategory = await prodCategory.findByIdAndUpdate(id, req.body, {
            new:true
        });
        res.json(updateCategory)
    } catch (error) {
        throw new Error(error);
    }
})

// delete product category
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteCategory = await prodCategory.findByIdAndDelete(id);
        res.json(deleteCategory)
    } catch (error) {
        throw new Error(error);
    }
})
// get product category
const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getACategory = await prodCategory.findById(id);
        res.json(getACategory)
    } catch (error) {
        throw new Error(error);
    }
})
// get all product category
const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const getAllCategory = await prodCategory.find();
        res.json(getAllCategory)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory

}