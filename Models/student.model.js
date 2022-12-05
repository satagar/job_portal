const mongoose = require('mongoose');

const student = new mongoose.Schema({
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

    experience: {
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
        default: () => {
            return Date.now()
        }
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
    }

})

module.exports = mongoose.model("Student", student)