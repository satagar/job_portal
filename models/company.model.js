const mongoose = require('mongoose');


const companySchema = mongoose.Schema({
    type : {
        type : String,
        required : true
    },
    com_id : {
        type : String,
        required : true,
        unique : true
    },
    name: {
        type: String,
        required: true,
    },
    password : {
        type : String,
        required : true
    },
    description: {
        type: String,
        required: true
    },
    locations: {
        type: [String]
    },
    minExperience: {
        type: Number,
        required: true
    },
    isHiring: {
        type: Boolean,
        default: true
    },
    companyStatus : {
        type : String,
        required : true,
        default : "APPROVED"
    }
})


module.exports = mongoose.model("Company", companySchema);