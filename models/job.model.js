const mongoose = require('mongoose')
const { open, closed } = require('../constants/jobs.constants')

exports.jobSchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    JD: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
    },
    updatedAt: {
        type: Date,
        immutable: false,
        default: () => {
            return Date.now()
        }
    }
})