const { default: mongoose } = require("mongoose");
const { hashPassword, comparePassword } = require("../helpers");

const adminSchema = mongoose.Schema({
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
    isEnabled: {
        type: Boolean,
        default: true
    },
    refreshToken: {
        type: String,
        select: false
    }
}, {
    timestamps: true,
    statics: {
        async authenticate(email, password) {
            const admin = await this.findOne({ email: email }).select('password');
            if(admin) {
                if(await comparePassword(password, admin.password)) {
                    return admin;
                }
            }
            return false;
        },
    },
});

adminSchema.virtual('role').get(function() {
    return `admin`;
});

adminSchema.pre('save', async function(next) {
    const admin = this;
    if(admin.isModified('password')) admin.password = await hashPassword(admin.password);
    next();
})

module.exports = mongoose.model("Admin", adminSchema);