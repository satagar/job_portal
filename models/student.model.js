const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    stu_id : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
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
    createdAt : {
        type : Date,
        default : () => {
            return Date.now();
        }
    }
})


module.exports = mongoose.model("Student", studentSchema);