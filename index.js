const express = require('express');
const app = express()
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8081;


app.use("/", (req, res) => {
    res.send("Hello From the server...!");
})

app.listen(PORT, () => {
    console.log(`E commerce server is running at port ${PORT}`)
})