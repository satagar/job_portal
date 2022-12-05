const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    jobListed: {
        type: Array,
        required: true
    }
});

module.exports = new mongoose.model('company', companySchema);