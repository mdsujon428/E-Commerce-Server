const express = require('express');
const { isAdmin, authMiddleWare } = require('../middlewares/authMiddleware');
const {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs
} = require('../controller/blogCtrl')
const router = express.Router();

router.post("/",authMiddleWare,isAdmin,createBlog)
router.put("/:id",authMiddleWare,isAdmin,updateBlog)
router.get("/:id",getBlog)
router.get("/",getAllBlogs)

module.exports = router;