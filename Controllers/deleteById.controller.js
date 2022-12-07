const Company = require('../Models/Company.model');

exports.deleteById = async(req, res) => {
    try {
        const company = await Company.findOneAndDelete({ userId: req.params.userId })
        res.status(200).send({
            message: 'Company removed successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Error Occured!'
        })
    }


}