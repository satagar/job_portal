const mongoose = require('mongoose');

const company = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    userId: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    emailId: {
        type: String,
        lowercase: true,
        minLength: 10,
        unique: true,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    career: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Job'
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
})

module.exports = mongoose.model("Company", company)