const express = require('express');
const { isAdmin, authMiddleWare } = require('../middlewares/authMiddleware');
const {
    createBlog,
    updateBlog,
    getBlog
} = require('../controller/blogCtrl')
const router = express.Router();

router.post("/",authMiddleWare,isAdmin,createBlog)
router.put("/:id",authMiddleWare,isAdmin,updateBlog)
router.get("/:id",getBlog)

module.exports = router;