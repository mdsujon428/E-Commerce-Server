const express = require('express');
const { isAdmin, authMiddleWare } = require('../middlewares/authMiddleware');
const {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    likeBlog,
    dislikeBlog
} = require('../controller/blogCtrl')
const router = express.Router();

router.post("/",authMiddleWare,isAdmin,createBlog)
router.put("/likes",authMiddleWare,likeBlog)
router.put("/dislike",authMiddleWare,dislikeBlog)
router.put("/:id",authMiddleWare,isAdmin,updateBlog)
router.get("/:id",getBlog)
router.get("/",getAllBlogs)
router.delete("/:id",authMiddleWare,isAdmin,deleteBlog)

module.exports = router;