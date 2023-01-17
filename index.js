const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8081;
const { default: mongoose, model } = require('mongoose');
const authRoute = require('./routes/authRoute');
const dbConnect = require('./config/dbConnect');
// const { default:mongoose } = require('mongoose'); 

// console.log("FROM HERE.......................... ",mongoose.set())


dbConnect();
app.use(bodyParser.urlencoded({extended:false}));
// app.use("/", (req, res) => {
//     res.send(`E commerce server is running at port ${PORT}`)
// })
app.use('/api/user',authRoute)

app.listen(PORT, () => {
    console.log(`E commerce server is running at port ${PORT}`)
})