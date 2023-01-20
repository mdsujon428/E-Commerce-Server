const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8081;
const { default: mongoose, model } = require('mongoose');
const authRoute = require('./routes/authRoute');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

dbConnect();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
// app.use("/", (req, res) => {
//     res.send(`E commerce server is running at port ${PORT}`)
// })
app.use('/api/user',authRoute)

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`E commerce server is running at port ${PORT}`)
})