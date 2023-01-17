const User = require('../models/userModel');

const createUser = async (req, res) => {
    // const {email} = req.body;
    const { email, firstName, mobile, password } = req.body;

    if (firstName && email && mobile && password) {
        try {
            const findUser = await User.findOne({ email });
        if (!findUser) {
            //create user
            const newUser = await User.create(req.body);
            res.status(200).json({
                ...newUser,
                message: "User created",
                status:true
            });
        } else {
            res.status(500).json({
                message: "This user is exist",
                success:false
            })
        }
        } catch (error) {
            console.log("Error message From here : ",error);
        }
    } else {
        res.status(500).json({
           
        })
    }
  
}

module.exports ={createUser}