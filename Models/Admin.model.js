const mongoose = require('mongoose');

const admin = new mongoose.Schema({
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
        minLength: 10
    },

    userType: {
        type: String,
        required: true,
        default: "STUDENT"
    },

    userStatus: {
        type: String,
        required: true,
        default: "APPROVED"
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

module.exports = mongoose.model("Admin", admin)