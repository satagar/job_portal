const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    job_id : {
        type : String,
        required : true,
        unique : true
    },
    company_name : {
        type : String,
        required : true
    },
    job_Type : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    salary : {
        type : String,
        required : true
    },
    experience : {
        type : String,
        required : true
    },
    location : {
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