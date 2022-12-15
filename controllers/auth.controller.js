const adminModel= require('../models/admin');
const Student = require('../models/student');
const Company = require('../models/company');
const bcrypt = require('bcrypt');


exports.signup = async(req,res)=>{
    const body = req.body;
    const userObj ={
        name:body.name,
        id:body.id,
        email:body.email,
        role:body.role,
        password: bcrypt.hashSync(body.password,8)
    }
    try {
        if(role=="student"){
            const students = await Student.create(userObj);
            res.status(201).send(students);

        }else{
            const companys =await Company.create(userObj);
            res.status(201).send(companys);

        }
    } catch (error) {
        res.status(500).send({
            massage:'Error Occured!'
        })
    }
}
exports.login = async(req, res) => {
    const body = req.body;
    const id = body.id;
    const password = body.password;
    const role = body.role;

    try {
        // const user = await Student.findOne({ id: id });
        if (role == 'student') {
            const student = await Student.findOne({ id: id })
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

            var token = jwt.sign({ id: user.id }, config.secret, {
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
            const company = await Company.findOne({ id: id })
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

    } catch (error) {
        res.status(500).send({
            message: 'Error Occured!'
        })
    }
}

// exports.login= async (req,res)=>{
//     const body = req.body;
    
//     try {
//         const user=await user.findOne({id: id});
//         res.status(200).send({
//             massage: 'User is not authorized for login'
//         })
//         return;
//     } catch (error) {
//         res.status(500).send({
//             massage: 'Error incorrect data'
//         })
//     }
// }


// exports.getStudentLogin= async (req,res)=>{
//     const body = req.body;
//     const id= body.id;
//     const password= body.password;

//     try {
//         const user=await user.findOne({id: id});
//         res.status(200).send({
//             massage: 'User is not authorized for login'
//         })
//         return;
//     } catch (error) {
//         res.status(500).send({
//             massage: 'Error incorrect data'
//         })
//     }
// }


