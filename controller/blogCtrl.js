const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')
const { validateMongoDbId } = require('../utils/validateMongodbId');

// create blog
const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req?.body);
        res.json({
            newBlog
        })
    } catch (error) {
        throw new Error(error);
    }
})

// update blog
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new:true
        });
        res.json({
            updateBlog
        })
    } catch (error) {
        throw new Error(error);
    }
})
// get blog
const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {
        const getBlog = await Blog.findById(id);
        const updateViews = await Blog.findByIdAndUpdate(
            id,
            {
            $inc:{numViews:1}
            },
            {new : true}
        )
        res.json(updateViews)
    } catch (error) {
        throw new Error(error);
    }
})

// get all blogs
const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const getAllBlogs = await Blog.find();
        res.json(getAllBlogs);
    } catch (error) {
        throw new Error(error);
    }
})

// delete a blog by id
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json(deleteBlog)
    } catch (error) {
        throw new Error(error)
    }
})

//like blog
const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    const blog = await Blog.findById(blogId);

})

module.exports = {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog
}