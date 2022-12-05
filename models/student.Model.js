const mongoose = require('mongoose');
const STUDENT = 'student';

exports.studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ''
    },
    email: {
        type : String,
        required : true,
        lowercase : true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: STUDENT
    },
    createdAt : {
        type : Date,
        immutable :true,
        default : () => {return Date.now()}
    },
    updatedAt : {
        type : Date,
        default : () => {return Date.now()}
    },
});
