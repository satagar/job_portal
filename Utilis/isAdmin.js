const admin = require('../Models/Admin.model');

exports.isAdmin = async(req, res, next) => {
    const admin = await admin.findOne({ userId: req.params.userId })
    if (admin.role == "Admin") {
        next();
    } else {
        return res.status(403).send({
            message: "Admin is Required"
        })
    }
}