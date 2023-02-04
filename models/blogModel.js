const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numViews:{
        type:Number,
        default:0, 
    },
    isLiked:{
        type:Boolean,
        default:false, 
    },
    isDisliked:{
        type:Boolean,
        default:false, 
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
    dislikes: [
        {
            type: mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
    images: {
        type: String,
        default:"https://plus.unsplash.com/premium_photo-1663852297654-56d979cf72d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    author: {
        type: String,
        default:"Admin"
    }
}, {
    toJSON: {
        virtuals:true
    },
    toObject: {
        virtuals:true
    },
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);