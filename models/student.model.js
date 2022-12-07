const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    type : {
        type : String,
        required : true
    },
    stu_id : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        minlength : 10
    },
    password : {
        type : String,
        required : true
    },
    studentStatus : {
        type : String,
        required : true,
        default : 'APPROVED'
    }
})


module.exports = mongoose.model("Student", studentSchema);