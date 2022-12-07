const Company = require('../Models/Company.model');
const objectConverter = require('../Utilis/objectConverter')

exports.findById = async(req, res) => {
    const userId = req.params.userId;
    try {
        const companys = await User.find({
            userId: userId
        }).exec()
        if (companys) {
            res.status(200).send(objectConverter.companyListConvertor(companys))
        } else {
            res.status(200).send({
                message: `User with id ${userId} not Found`
            })
        }
    } catch (err) {
        res.status(500).send({
            message: `User with id ${userId} not Found`
        })
    }
}