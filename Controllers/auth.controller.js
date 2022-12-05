const Student = require('../Models/student.model');
const bcrypt = require('bcrypt')
exports.signup = async(req, res) => {
    const body = req.body;
    let userStatus = "PENDING";
    const userType = body.userType;
    if (userType == "STUDENT" || userType == "ADMIN") {
        userStatus = "APPROVED";
    } else {
        userStatus = "PENDING"
    }

    userObj = {
        name: body.name,
        userId: body.userId,
        emailId: body.emailId,
        userType: userType,
        userStatus: userStatus,
        password: bcrypt.hashSync(body.password, 8)
    }

    try {
        const student = await Student.create(userObj);
        res.status(201).send(student)
    } catch (error) {
        res.status(500).send({
            message: 'Error Occured!'
        })
    }

}