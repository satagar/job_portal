const Student = require('./Models/student.model');

exports.studentData = async(req, res) => {
    await Student.create({
        name: "Pranit Dubal",
        userId: "2345",
        emailId: "pranitdubal5@gmail.com",
        userType: "Student",
        userStatus: "APPROVED"
    })
}