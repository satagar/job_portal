const mongoose = require('mongoose');

const status = ['open', 'closed'];
const type = ['fullTime', 'partTime'];

const jobSchema = new mongoose.Schema({
    job_id : {
        type : String,
        required : true,
        unique : true
    },
    company : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    postedByCompany: {
        type: String
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
    type: {
        type: String,
        enum: type,
        default: 'fullTime'
    },
    status: {
        type: String,
        enum: status,
        default: 'open'
    },
    createdAt : {
        type : Date,
        default : () => {
            return Date.now();
        }
    }
})


module.exports = mongoose.model("Job", jobSchema);