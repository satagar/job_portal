const bcrypt = require('bcrypt')
const Student = require('../models/student.model');
const Company = require('../models/company.model');
const config = require('../config/serverConfig');
const jwt = require('jsonwebtoken');
exports.signup = async(req, res) => {
    const body = req.body;
    let userType = body.type;

    const salt = await bcrypt.genSalt(10);
    

    try {
        if(userType === "STUDENT") {
            let StudentObj = {
                type : userType,
                stu_id : body.stu_id,
                name : body.name,
                phoneNumber : body.phoneNumber,
                email : body.email,
                password : bcrypt.hashSync(body.password, salt),
                userStatus : body.userStatus
            }
            const studentResponse = await Student.create(StudentObj);

            const resObj = {
                type : studentResponse.userType,
                stu_id : studentResponse.stu_id,
                name : studentResponse.name,
                phoneNumber : studentResponse.phoneNumber,
                email : studentResponse.email,
                userStatus : studentResponse.userStatus
            }
            res.status(200).send(resObj)
        }
        if(userType === "COMPANY") {
            let companyObj = {
                type : userType,
                com_id : body.com_id,
                name : body.name,
                password : bcrypt.hashSync(body.password, salt),
                description : body.description,
                locations : body.locations,
                minExperience : body.minExperience,
                isHiring : body.isHiring,
                companyStatus : body.companyStatus
            }

            const companyResponse = await Company.create(companyObj);
            const resObj = {
                type : companyResponse.userType,
                com_id : companyResponse.com_id,
                name : companyResponse.name,
                description : companyResponse.description,
                locations : companyResponse.locations,
                minExperience : companyResponse.minExperience,
                isHiring : companyResponse.isHiring,
                companyStatus : companyResponse.companyStatus
            }
            res.status(200).send(resObj);
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Failure in signup!`
        })
    }
}


exports.signin = async(req, res) => {
    // retrieve input from req object
    const body = req.body;
    const reqComId = body.com_id;
    const reqStuId = body.stu_id
    const password = body.password;

    try {
        const company = await Company.findOne({com_id : reqComId});

        if(company == null) {
            res.status(400).send({
                message : 'Company not found!'
            });
            return;
        }
        if(company.companyStatus !== 'APPROVED') {
            res.status(200).send({
                message : `User is not authorized for login`
            })
            return;
        }

        var passwordIsValid = bcrypt.compareSync(
            password,
            company.password
        );

        if(!passwordIsValid) {
            res.status(401).send({
                message : `Invalid password`
            });
            return;
        }

        var token = jwt.sign({ id : company.com_id }, config.SECRET, {
            expiresIn : 86400 //24hrs
        });

        res.status(200).send({
            type : company.userType,
            name : company.name,
            description : company.description,
            locations : company.locations,
            minExperience : company.minExperience,
            isHiring : company.isHiring,
            companyStatus : company.companyStatus,
            acessToken : token
        })
    } catch (error) {
        console.log(error.message);     
        res.status(500).send({
            message : `Failure in signin!`  
        });
    }

    try {
        const student = await Company.findOne({com_id : reqStuId});

        if(student == null) {
            res.status(400).send({
                message : 'student not found!'
            });
            return;
        }
        if(student.companyStatus !== 'APPROVED') {
            res.status(200).send({
                message : `User is not authorized for login`
            })
            return;
        }

        var passwordIsValid = bcrypt.compareSync(
            password,
            student.password
        );

        if(!passwordIsValid) {
            res.status(401).send({
                message : `Invalid password`
            });
            return;
        }

        var token = jwt.sign({ id : student.com_id }, config.SECRET, {
            expiresIn : 86400 //24hrs
        });

        res.status(200).send({
            type : student.userType,
            stu_id : student.stu_id,
            name : student.name,
            phoneNumber : student.phoneNumber,
            email : student.email,
            userStatus : student.userStatus,
            acessToken : token
        })
    } catch (error) {
        console.log(error.message);     
        res.status(500).send({
            message : `Failure in signin!`  
        });
    }
}