const { default: mongoose } = require("mongoose");

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    locations: {
        type: [String]
    },
    isHiring: {
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

module.exports = mongoose.model("Company", companySchema);