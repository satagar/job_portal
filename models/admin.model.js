const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adm_Id : {
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
    createdAt : {
        type : Date,
        default : () => {
            return Date.now();
        }
    }
})

module.exports = mongoose.model("admin", adminSchema);