const express = require('express');
const { isAdmin, authMiddleWare } = require('../middlewares/authMiddleware');
const {createBlog} =  require('../controller/blogCtrl')
const router = express.Router();

router.post("/",authMiddleWare,isAdmin,createBlog)

module.exports = router;