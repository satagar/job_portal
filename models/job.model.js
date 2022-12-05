const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: Text,
        required: true
    },
    requirement: {
        type: Text,
        required: true
    },
    openingDate: {
        type: Date,
        required: true
    },
    closingDate: {
        type: Date,
        required: true
    }
});

module.exports = new mongoose.model('job', jobSchema);