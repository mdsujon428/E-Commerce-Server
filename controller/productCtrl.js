const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const User = require('../models/userModel');

// create product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify( req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct)
    } catch (error) {
       
        throw new Error(error)
    }
})

// update product
const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findOneAndUpdate({ id }, req.body, { new: true });
        res.json(updateProduct)
    } catch (error) {
        throw new Error(error);
    }
})

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
        const deleteProduct = await Product.findOneAndDelete(id);
        res.json(deleteProduct)
    } catch (error) {
        throw new Error(error);
    }
})

// get a product
const getAProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
      try {
          const getAProduct = await Product.findById(id);
          res.json(getAProduct);
      } catch (error) {
        throw new Error(error)
      }
})

// get all product
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        //Filtering
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`)
      
        let query = Product.find(JSON.parse(queryStr));

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("createdAt");
        }

        //Limiting the fields
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields)
        } else {
            query = query.select('-__v')
        }

        // pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) {
                throw new Error("This page does not exits")
            }
        }

        const products = await query;
        res.json(products);
    } catch (error) {
        throw new Error(error);
    }
})


// add to wish list
const addToWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    try {
        const user = await User.findById(_id);
        const alReadyAdded = user.wishlist.find((id) => id.toString() === prodId);
        if (alReadyAdded) {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $pull:{wishlist:prodId}
                },
                {
                    new:true
                }
            )
            res.json(user);
        } else {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $push:{wishlist:prodId}
                },
                {
                    new:true
                }
            )
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
})

const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId } = req.body;
    const product = await Product.findById(prodId);
    const alreadyRated = product.ratings.find(({ postedby }) => postedby.toString() === _id.toString() );
   try {
       if (alreadyRated) {
           let updateRating = await Product.updateOne(
               {
                ratings: { $elemMatch: alreadyRated }
               },
               {
                $set:{"ratings.$.star":star},
               },
               {new:true}
           )
        res.json(updateRating)
    } else {
        //console.log(alreadyRated)
        const rateProduct = await Product.findByIdAndUpdate(
            prodId,
            {
                $push: {
                    ratings: {
                        star: star,
                        postedby:_id
                    }
                }
            }
        )
        res.json(rateProduct)
    }
   } catch (error) {
       throw new Error(error);
   }
})

module.exports = {
    createProduct,
    getAProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishList,
    rating
}