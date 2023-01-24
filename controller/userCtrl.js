const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exist");
    }
})

const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // if user exists or not 
    const findUser = await User.findOne({ email });
    if (findUser && findUser.isPasswordMatched(password)) {
        res.json({
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token:generateToken(findUser._id)
        })
    } else {
        throw new Error("Email or password is Invalid")
    }
    
})

//GET ALL User
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.status(200).json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
})


const getAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getSingleUser = await User.findById(id);
        res.json({ getSingleUser });
    } catch (error) {
        throw new Error(error);
    }
})
const deleteAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteSingleUser = await User.findByIdAndDelete(id);
        res.json({ deleteSingleUser });
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = { createUser, loginUserCtrl,getAllUser,getAUser,deleteAUser }
