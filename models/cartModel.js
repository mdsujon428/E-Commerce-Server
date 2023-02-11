const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    Products: [
        {
         product: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
            },
        count: Number,
        color: String,
        price:Number
        }
    ],
    cartTotal: {},
    totalAfterDiscount:Number,
    orderby: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('User', userSchema);