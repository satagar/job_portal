const mongoose = require("mongoose")
const emailValidator = require("email-validator")
const bcrypt = require("bcrypt")

const db_link = process.env.MONGO_URI
mongoose.connect(db_link)
.then(function(db){
    console.log("Databse connected")
})
.catch(function(err){
    console.log(err)
})

//createing Schema

const jobShema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    thumbnail: {
        type: String,
        default: 'img/thumbnails/default.jpeg'
    }
})

const jobModel = mongoose.model("jobModel", jobShema)
module.exports = jobModel
