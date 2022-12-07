const Student = require('../Models/student.model');
const Company = require('../Models/Company.model')
const bcrypt = require('bcrypt')
exports.signup = async(req, res) => {
    const body = req.body;
    // let userStatus = "PENDING";
    // const userType = body.userType;
    // if (userType == "STUDENT" || userType == "ADMIN") {
    //     userStatus = "APPROVED";
    // } else {
    //     userStatus = "PENDING"
    // }

    userObj = {
        name: body.name,
        userId: body.userId,
        emailId: body.emailId,
        role: body.role,
        password: bcrypt.hashSync(body.password, 8)
    }

    try {
        if (role == "student") {
            const students = await Student.create(userObj);
            res.status(201).send(students)
        } else {
            const companys = await Company.create(userObj);
            res.status(201).send(companys)
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error Occured!'
        })
    }

}

exports.login = async(req, res) => {
    const body = req.body;
    const userId = body.userId;
    const password = body.password;
    const role = body.role;

    try {
        const user = await Student.findOne({ userId: userId });
        if (role == 'student') {
            const student = await Student.findOne({ userId: userId })
            if (student == null) {
                res.status(400).send({
                    message: "User Not Found!"
                })
                return;
            }
            var validPassword = bcrypt.compareSync(
                body.password,
                user.password
            )

            if (!validPassword) {
                res.status(401).send({
                    message: "Invalid Password"
                })
                return;
            }

            var token = jwt.sign({ id: user.userId }, config.secret, {
                expiresIn: 86400
            });
            const userResp = {
                name: user.name,
                userId: user.userId,
                emailId: user.emailId,
                role: user.role,
                accessToken: token
            }

            res.status(200).send(userResp);
        } else {
            const company = await Company.findOne({ userId: userId })
            if (company == null) {
                res.status(400).send({
                    message: "User Not Found!"
                })
                return;
            }
            var validPassword = bcrypt.compareSync(
                body.password,
                user.password
            )

            if (!validPassword) {
                res.status(401).send({
                    message: "Invalid Password"
                })
                return;
            }

            var token = jwt.sign({ id: user.userId }, config.secret, {
                expiresIn: 86400
            });
            const userResp = {
                name: user.name,
                userId: user.userId,
                emailId: user.emailId,
                role: user.role,
                accessToken: token
            }

            res.status(200).send(userResp);
        }
        if (company == null) {
            res.status(400).send({
                message: "User Not Found!"
            })
            return;
        }
        var validPassword = bcrypt.compareSync(
            body.password,
            user.password
        )

        if (!validPassword) {
            res.status(401).send({
                message: "Invalid Password"
            })
            return;
        }

        var token = jwt.sign({ id: user.userId }, config.secret, {
            expiresIn: 86400
        });
        const userResp = {
            name: user.name,
            userId: user.userId,
            emailId: user.emailId,
            role: user.role,
            accessToken: token
        }

        res.status(200).send(userResp);

    } catch (error) {
        res.status(500).send({
            message: 'Error Occured!'
        })
    }
}