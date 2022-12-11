const { default: mongoose } = require("mongoose");

const types = ['fullTime', 'partTime'];
const statuses = ['open', 'closed'];

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    minExperience: {
        type: Number,
        required: true
    },
    postedByCompany: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
        required: true
    },
    applyingStudents: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student'
        }]
    },
    shortlistedStudents: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student'
        }]
    },
    tags: {
        type: [String]
    },
    type: {
        type: String,
        enum: types,
        default: 'fullTime'
    },
    status: {
        type: String,
        enum: statuses,
        default: 'open'
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    statics: {
        types: types,
        statuses: statuses
    },
});

module.exports = mongoose.model("Job", jobSchema);