const mongoose = require('mongoose')

exports.companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        default: ''
    },
    companyEmailId: {
        type: String,
        default: ''
    },
    companyContactNo: {
        type: String,
        default: ''
    },
    authPersonEmail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        default: "COMPANY"
    },
    createdAt: {
        type: Date,
        default: Date
    }
})