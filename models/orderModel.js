const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    Products: [
        {
         product: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
            },
        count: Number,
        color:String
        }
    ],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: "pending",
        enum: [
            "Pending",
            "On process",
            "Shift",
            "Cancel"
        ]
    },
    orderby: {
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User"
    }
},
{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);