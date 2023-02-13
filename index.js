const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const { default: mongoose, model } = require('mongoose');
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const blogRoute = require('./routes/blogRoute');
const categoryRoute = require('./routes/prodCategoryRoute');
const blogCategoryRoute = require('./routes/blogCatRoute');
const couponRoute = require('./routes/couponRoute');
const orderRoute = require('./routes/orderRoute');
const brandCategoryRoute = require('./routes/brandRoute');

const PORT = process.env.PORT || 8081;

const morgan = require('morgan');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

dbConnect();
// app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.unsubscribe(cookieParser());

// app.use("/", (req, res) => {
//     res.send(`E commerce server is running at port ${PORT}`)
// })
app.use('/api/user', authRoute);
app.use('/api/product',productRoute)
app.use('/api/blog',blogRoute)
app.use('/api/category',categoryRoute)
app.use('/api/blogCategory',blogCategoryRoute)
app.use('/api/brandCategory',brandCategoryRoute)
app.use('/api/coupon',couponRoute)
app.use('/api/order',orderRoute)

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`E commerce server is running at port ${PORT}`)
})