const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema coupon
var couponSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true,
        uppercase:true
    },
    expiry: {
        type: Date,
        required: true,
    },
    discount: {
        type: Number,
        require:true
    }
});

//Export the model
module.exports = mongoose.model('Coupon', couponSchema);