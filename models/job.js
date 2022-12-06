const { default: mongoose } = require("mongoose");

const status = ['open', 'closed'];
const type = ['fullTime', 'partTime'];

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
        ref: 'company'
    },
    applyingStudents: {
        type: [String]
    },
    shortlistedStudents: {
        type: [String]
    },
    tags: {
        type: [String]
    },
    type: {
        type: String,
        enum: type,
        default: 'fullTime'
    },
    status: {
        type: String,
        enum: status,
        default: 'open'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Job", jobSchema);