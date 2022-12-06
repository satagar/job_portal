const { default: mongoose } = require("mongoose");

const studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    resumes: {
        type: [String]
    },
    tags: {
        type: [String]
    },
    isSeeking: {
        type: Boolean,
        default: true
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

studentSchema.virtual('name').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model("Student", studentSchema);