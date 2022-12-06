const { default: mongoose } = require("mongoose");
const { hashPassword, comparePassword } = require("../helpers");

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function() {
            return this.isNew;
        },
        select: false
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
    timestamps: true,
    statics: {
        async authenticate(email, password) {
            const company = await this.findOne({ email: email }).select('password');
            if(admin) {
                if(await comparePassword(password, company.password)) {
                    return company;
                }
            }
            return false;
        },
    },
});

companySchema.pre('save', async function(next) {
    const company = this;
    if(company.isModified('password')) company.password = await hashPassword(company.password);
    next();
})

module.exports = mongoose.model("Company", companySchema);