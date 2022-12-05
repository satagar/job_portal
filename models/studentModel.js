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

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:function(){
            return emailValidator.validate(this.email)
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function(){
            return this.confirmPassword == this.password
        }
    },
    role: {
        type: String,
        enum: ['admin', 'company', 'student'],
        default: 'student'
    },
    profileImage: {
        type: String,
        default: 'img/users/default.jpeg'
    }
})

studentSchema.pre("save", function(){
    this.confirmPassword = undefined
})

const studentModel = mongoose.model("studentModel", studentSchema)
module.exports = studentModel
