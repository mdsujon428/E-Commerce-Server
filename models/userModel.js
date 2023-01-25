const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        default:'user'
    },
    cart: {
        type: Array,
        default:[]
    },
    address: [{ type: mongoose.Schema.ObjectId, ref: "Address" }],
    wishlist:[{type:mongoose.Schema.ObjectId,ref:"Product"}]
},
    {
    timestamps:true
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    //console.log("salt = ",salt);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);