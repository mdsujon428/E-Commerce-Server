const brandCategory = require('../models/brandModel');
const asyncHandler = require('express-async-handler');
const { validateMongoDbId } = require('../utils/validateMongodbId');

// create brand category
const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await brandCategory.create(req.body);
        res.json(newCategory)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports ={createCategory}