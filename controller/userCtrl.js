const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const { validateMongoDbId } = require('../utils/validateMongodbId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');


// create a user
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

// login a user 
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // if user exists or not 
    const findUser = await User.findOne({ email });
    if (findUser && findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(
            findUser._id,
            {
            refreshToken
            },
            {new:true}
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge:72*60*60*1000,
        })
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

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const fullCookie = req.headers?.cookie;
    cookies = fullCookie.split(';');
    let cookieObject = {};
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        if (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1,)
        }
        const cookieName = cookie.substring(0, cookie.indexOf('='));
        const cookieValue = cookie.substring(cookieName.length + 1,);
        
        cookieObject = { ...cookieObject };
        cookieObject[cookieName] = cookieValue;
    }
    if(!cookieObject.refreshToken) throw new Error("No Refresh Token in Cookies")
    const refreshToken = cookieObject.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No Refresh token in the db or not matched");
    jwt.verify(
        refreshToken,
        process.env.JWT_SECRET,
        (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token");
            } 
            const accessToken = generateToken(user?._id);
            res.json({accessToken})
    });

})

// Update a user
const updatedAUser = asyncHandler(async(req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        updateUser = await User.findByIdAndUpdate(_id, {
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req.body?.email,
            mobile:req.body?.mobile
        },
        {
            new:true
        }
        )
        res.json(updateUser);
    } catch (error) {
        throw new Error(error);
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

// get a user by id

const getAUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const getSingleUser = await User.findById(_id);
        res.json({ getSingleUser });
    } catch (error) {
        throw new Error(error);
    }
})

// delete a user by id
const deleteAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteSingleUser = await User.findByIdAndDelete(id);
        res.json({ deleteSingleUser });
    } catch (error) {
        throw new Error(error);
    }
})

// block to a user
const blockUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const block =await User.findByIdAndUpdate(
            id,
            {
            isBlocked:true
            },
            {
            new:true
            }
        );
        res.json({
            message:"User is Block"
        })
    } catch (error) {
        throw new Error(error)
    }
})

// unblock to a user

const unblockUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const unBlock = await User.findByIdAndUpdate(
            id,
            {
            isBlocked:false
            },
            {
            new:true
            }
        );
        res.json({
            message:"User is Unblocked"
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    getAUser,
    blockUser,
    createUser,
    getAllUser,
    deleteAUser,
    unblockUser,
    loginUserCtrl,
    updatedAUser,
    handleRefreshToken
}
