const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const { validateMongoDbId } = require('../utils/validateMongodbId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('./emailCtrl');
const crypto = require('crypto');


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
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // if user exists or not 
    const findUser = await User.findOne({ email });
   
    if (findUser && await findUser.isPasswordMatched(password)) {
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
            role:findUser?.role,
            token:generateToken(findUser._id)
        })
       
    } else {
        throw new Error("Email or password is Invalid")
    }
})

// admin login
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // if user exists or not 
    const findAdmin = await User.findOne({ email });
    if(findAdmin.role !== "admin") throw new Error("Not Authorized")
    if (findAdmin && await findAdmin.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateAdmin = await User.findByIdAndUpdate(
            findAdmin._id,
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
            firstName: findAdmin?.firstName,
            lastName: findAdmin?.lastName,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            role:findAdmin?.role,
            token:generateToken(findAdmin._id)
        })
       
    } else {
        throw new Error("Email or password is Invalid")
    }
})


// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const fullCookie = req.headers?.cookie;
    if (fullCookie === undefined) throw new Error("There are no cookies");
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

const logout = asyncHandler(async (req, res) => {
    const fullCookie = req.headers?.cookie;
    
    if (fullCookie === undefined) throw new Error("There are no cookies");

    const cookies = fullCookie.split(";");
    
    let cookieObject = {};

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];

        if (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1,);
        }
        const cookieName = cookie.substring(0, cookie.indexOf("="));
        const cookieValue = cookie.substring(cookieName + 1,);
       
        cookieObject = { ...cookieObject };
        cookieObject[cookieName] = cookieValue;
    }
    if (!cookieObject.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookieObject.refreshToken;
    const user = User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        });
        return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: ""
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
    });
    res.sendStatus(204);  // forbidden
});

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

// Save user Address
const saveAddress = asyncHandler(async (req, res,next) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    console.log(req.body)
    try {
        const saveAddress = await User.findByIdAndUpdate(
            _id,
            {
                $push: {
                    addresses: {
                        address: req.body?.address,
                        home: req.body?.home,
                        office:req.body?.office
                    }
                }
            },
            {
            new:true
            }
        )
        res.json(saveAddress);
    } catch (error) {
        
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

const updatePassword = asyncHandler(async(req, res) =>{
    const { _id } = req.user;
    const {password} = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);

    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        //console.log(updatePassword)
        res.json(updatedPassword)
    } else {
        throw new Error(user)
    }
})

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (email === undefined) throw new Error("No email found...!");
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
        const token = await user.createPasswordRefreshToken();
        //console.log(token);
        await user.save();
        const resultURL = `<br> <p> Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes form now . <a href='http://localhost:8081/api/user/reset-password/${token}'> Click Here  </a>  </p>`;
        const data = {
            to: email,
            text: "Hi there",
            subject: "Forgot Password Link",
            html:resultURL
        }
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error)
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires:{$gt:Date.now()}
    })
    if (!user) throw new Error("Token Expired ,Please ary again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
})

const getWishList = asyncHandler(async(req, res)=> {
    const { _id } = req.user;
    try {
        const findUser = await User.findById(_id).populate('wishlist')
        res.status(200).json(findUser);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    getAUser,
    blockUser,
    createUser,
    getAllUser,
    deleteAUser,
    loginAdmin,
    unblockUser,
    loginUser,
    updatedAUser,
    handleRefreshToken,
    updatePassword,
    logout,
    forgotPasswordToken,
    resetPassword,
    getWishList,
    saveAddress
}
