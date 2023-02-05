const prodCategory = require('../models/prodCategoryModel.js');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');

const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await prodCategory.create(req.body);
        res.json(newCategory)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports ={createCategory}