const express = require('express');
const app = express()
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8081;
const { default: mongoose, model } = require('mongoose');
const authRoute = require('./routes/authRoute');
// const { default:mongoose } = require('mongoose'); 

// console.log("FROM HERE.......................... ",mongoose.set())

const dbConnect = require('./config/dbConnect');

dbConnect();


app.listen(PORT, () => {
    console.log(`E commerce server is running at port ${PORT}`)
})