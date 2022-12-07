const adminModel= require('../models/admin');

exports.getAdminLogin= async (req,res)=>{
    const body = req.body;
    const id= body.id;
    const password= body.password;

    try {
        const user=await user.findOne({id: id});
        res.status(200).send({
            massage: 'User is not authorized for login'
        })
        return;
    } catch (error) {
        res.status(500).send({
            massage: 'Error incorrect data'
        })
    }
}


exports.getStudentLogin= async (req,res)=>{
    const body = req.body;
    const id= body.id;
    const password= body.password;

    try {
        const user=await user.findOne({id: id});
        res.status(200).send({
            massage: 'User is not authorized for login'
        })
        return;
    } catch (error) {
        res.status(500).send({
            massage: 'Error incorrect data'
        })
    }
}


