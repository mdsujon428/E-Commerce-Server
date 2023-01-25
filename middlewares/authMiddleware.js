const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleWare = asyncHandler(async (req, res,next) => {
    let token;
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        token = req?.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                req.user = user;
                next();
            }
        } catch (error) {
            throw new Error("Not Authorized token expired , Please Login again");
        }
    } else {
        throw new Error("There is token attached to header");
    }
})

const isAdmin = asyncHandler(async (req, res,next) => {
    const { email } = req.user;
    const adminUser = User.findOne({ email });
    if (adminUser.role !== "admin") {
        req.user["message"] = "Your are not an admin";
        next();
    } else {
        req.user["message"] = "Your are an admin";
        next();
    }
})

module.exports = { authMiddleWare,isAdmin };

/*
 
    63c92828e15812f63dadf6de
 
 */