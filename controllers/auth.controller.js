const { handleUnauthorizedResponse, handleNotFoundResponse, handleServerErrorResponse, generateAccessToken, generateRefreshToken, verifyAccessToken, decodeAccessToken, handleBadRequestResponse } = require("../helpers");
const { Admin, Student, Company } = require("../models");

const registerStudent = async (req, res) => {
    let student = await Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        birthdate: req.body.birthdate,
        experience: req.body.experience,
        tags: req.body.tags,
        isSeeking: true,
        isEnabled: true
    }).catch(error => handleServerErrorResponse(res, error));
    if(student) res.status(201).json(student);
}

const registerCompany = async (req, res) => {
    let company = await Company.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        description: req.body.description,
        locations: req.body.locations,
        isHiring: true,
        isEnabled: true
    }).catch(error => handleServerErrorResponse(res, error));
    if(company) res.status(201).json(company);
}

const login = async (req, res) => {
    let user = null;
    switch(req.body.role) {
        case 'admin': user = await Admin.authenticate(req.body.email, req.body.password).catch(error => handleUnauthorizedResponse(res)); break;
        case 'student': user = await Student.authenticate(req.body.email, req.body.password).catch(error => handleUnauthorizedResponse(res)); break;
        case 'company': user = await Company.authenticate(req.body.email, req.body.password).catch(error => handleUnauthorizedResponse(res)); break;
        default: handleBadRequestResponse(res);
    }
    if(user) {
        user.refreshToken = generateRefreshToken();
        user.save();
        res.status(200).json({
            accessToken: generateAccessToken(user),
            refreshToken: user.refreshToken
        });
    }
}

const logout = (req, res) => {
    res.status(200).json({
        message: 'Logout successful'
    });
}

const refresh = async (req, res) => {
    const payload = await decodeAccessToken(req.body.accessToken);
    let user = null;
    switch(payload.role) {
        case 'admin': user = await Admin.findOne({
            id: payload.id,
            refreshToken: req.body.refreshToken
        }).catch(error => handleServerErrorResponse(res, error)); break;

        case 'student': user = await Student.findOne({
            id: payload.id,
            refreshToken: req.body.refreshToken
        }).catch(error => handleServerErrorResponse(res, error)); break;

        case 'company': user = await Company.findOne({
            id: payload.id,
            refreshToken: req.body.refreshToken
        }).catch(error => handleServerErrorResponse(res, error)); break;
    }
    
    if(user) {
        user.refreshToken = generateRefreshToken();
        user.save();
        res.status(200).json({
            accessToken: generateAccessToken(user),
            refreshToken: user.refreshToken
        });
    }
    else handleNotFoundResponse(res);
}

module.exports = {
    registerStudent: registerStudent,
    registerCompany: registerCompany,
    login: login,
    logout: logout,
    refresh: refresh
}