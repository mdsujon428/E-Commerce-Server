const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require('crypto')

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
    isBlocked: {
        type: Boolean,
        default:false
    },
    cart: {
        type: Array,
        default:[]
    },
    address: [{ type: mongoose.Schema.ObjectId, ref: "Address" }],
    wishlist: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
    refreshToken: {
        type:String
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires:Date
},
{
    timestamps:true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    //enteredPassword = await bcrypt.hash(enteredPassword.toString(), true);
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.createPasswordRefreshToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
    return resetToken;
}
//Export the model
module.exports = mongoose.model('User', userSchema);