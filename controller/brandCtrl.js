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

//update brand category
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
   try {
       const updateCategory = await brandCategory.findByIdAndUpdate(
           id,
           req.body,
           { new: true }
       );
       res.json(updateCategory);
   } catch (error) {
       throw new Error(error)
   }
})

module.exports = {
    createCategory,
    updateCategory
}