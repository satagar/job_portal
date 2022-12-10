const mongoose = require('mongoose')
const { company } = require('../constants/roles.constants')

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
        immutable: true,
        default: () => {
            return Date.now()
        }
    },
    updatedAt: {
        type: true,
        immutable: false,
        default: () => {
            return Date.now()
        }
    }
})