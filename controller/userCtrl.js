const User = require('../models/userModel');

const createUser = async (req, res) => {
    const email = req.body;
    const findUser = await User.findOne(email);
    if (!findUser) {
        // create new user 
        const newUser = User.create(req.body);
        res.status(200).json(newUser);
    }
    else {
        // User Already exist
        res.status(500).json({
            message: "User is already exit",
            success:false
        })
    }
}

module.exports = { createUser };