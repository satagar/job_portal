const jwt = require("jsonwebtoken")
const config = require('../Configs/configs.secret')

exports.tokenValidation = async(req, res, next) => {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(403).send({
            message: "Token Not Found"
        })

    }
    jwt.verify(token, config.secret, (err, decode) => {

        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            })
        }
        req.userId = decode.id;

        next()
    })
}