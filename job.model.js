const mongoose = require('mongoose')

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
        immutable: false,
        default: () => {
            return Date.now()
        }
    }
})