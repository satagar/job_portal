const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Requirements: {
        type: String,
        required: true
    },
    postedByCompany: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Company'
    },
    appliedStudent: {
        type: mongoose.SchemaType.ObjectId,
        ref: 'student'
    },
    type: {
        type: String,
        default: "FULL-TIME"
    },
    status: {
        type: String,
        default: "OPEN"
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
        default: () => {
            return Date.now()
        }
    }
});

module.exports = mongoose.model('JobSchema', jobSchema)