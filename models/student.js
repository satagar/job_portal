const { default: mongoose } = require("mongoose");
const { hashPassword, comparePassword } = require("../helpers");

const studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
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
    timestamps: true,
    statics: {
        async authenticate(email, password) {
            const student = await this.findOne({ email: email }).select('password');
            if(student) {
                if(await comparePassword(password, student.password)) {
                    return student;
                }
            }
            return false;
        },
    },
});

studentSchema.virtual('name').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

studentSchema.virtual('role').get(function() {
    return `student`;
});

studentSchema.pre('save', async function(next) {
    const student = this;
    if(student.isModified('password')) student.password = await hashPassword(student.password);
    if(student.isModified('birthdate') && 'string' === typeof student.birthdate) student.birthdate = new Date(student.birthdate);
    if(student.isModified('tags') && 'string' === typeof student.tags) student.tags = student.tags.split(/[ ,]+/).map(string => string.trim());
    next();
})

module.exports = mongoose.model("Student", studentSchema);