const admin = require('../models/admin');

exports.isAdmin = async(req, res, next) => {
    const admin = await admin.findOne({ id: req.params.id })
    if (admin.role == "Admin") {
        next();
    } else {
        return res.status(403).send({
            message: "Admin is Required"
        })
    }
}