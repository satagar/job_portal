const Company= require('../models/company');

exports.deleteById = async(req,res)=>{
    try {
        const company=await Company.findById({id: req.params.id})
        res.status(200).send({
            massage:'Company remove';
        })
    } catch (error) {
        res.status(500).send({
            massage:'Error Occured'
        })
    }
}