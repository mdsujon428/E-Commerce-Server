const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    console.log(Boolean(findUser))
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
       res.json(findUser)
    } else {
        throw new Error("Email or password is Invalid")
    }
    
})


module.exports ={createUser,loginUserCtrl}