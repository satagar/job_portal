const express = require('express');
const mongoose = require('mongoose');
const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/jobPortal');
        console.log("connected to DB");
    }catch(err){
        console.log(err);
    }
}

connectDB();

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});