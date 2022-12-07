const { check, validationResult } = require('express-validator');
const { isObjectId } = require('../helpers');
const { Admin, Student, Company } = require("../models");

const roles = ['admin', 'student', 'company'];

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
}

module.exports = {
    authRegisterStudent: [
        check('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail().isEmail().withMessage('Email is invalid').bail().custom(value => {
            return Student.findOne({ email: value }).then(student => { if(student) return Promise.reject('Student Email is already taken')} );
        }),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail().isLength({ min: 5 }).withMessage('Password must be minimum 5 characters').bail(),
        check('firstName').trim().escape().not().isEmpty().withMessage('First Name cannot be empty').bail().isLength({ min: 3 }).withMessage('First Name must be minimum 3 characters').bail(),
        check('lastName').trim().escape().not().isEmpty().withMessage('Last Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Last Name must be minimum 3 characters').bail(),
        check('birthdate').trim().escape().not().isEmpty().withMessage('Birthdate cannot be empty').bail(),
        check('experience').trim().escape().not().isEmpty().withMessage('Experience cannot be empty').bail().isNumeric().withMessage('Experience must be a number (in years)').bail(),
        handleValidation
    ],
    authRegisterCompany: [
        check('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail().isEmail().withMessage('Email is invalid').bail().custom(value => {
            return Company.findOne({ email: value }).then(company => { if(company) return Promise.reject('Company Email is already taken')} );
        }),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail().isLength({ min: 5 }).withMessage('Password must be minimum 5 characters').bail(),
        check('name').trim().escape().not().isEmpty().withMessage('Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Name must be minimum 3 characters').bail(),
        handleValidation
    ],
    authLogin: [
        check('role').trim().escape().not().isEmpty().withMessage('Role cannot be empty').bail().custom(value => {
            if(!roles.includes(value)) throw new Error(`Role is invalid. Please provide any of: ${roles.join()}`);
        }),
        check('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail(),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail(),
        handleValidation
    ],
    authRefresh: [
        check('accessToken').trim().escape().not().isEmpty().withMessage('Access token cannot be empty').bail(),
        check('refreshToken').trim().escape().not().isEmpty().withMessage('Refresh token cannot be empty').bail(),
        handleValidation
    ],
    studentCreate: [
        check('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail().isEmail().withMessage('Email is invalid').bail().custom(value => {
            return Student.findOne({ email: value }).then(student => { if(student) return Promise.reject('Student Email is already taken')} );
        }),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail().isLength({ min: 5 }).withMessage('Password must be minimum 5 characters').bail(),
        check('firstName').trim().escape().not().isEmpty().withMessage('First Name cannot be empty').bail().isLength({ min: 3 }).withMessage('First Name must be minimum 3 characters').bail(),
        check('lastName').trim().escape().not().isEmpty().withMessage('Last Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Last Name must be minimum 3 characters').bail(),
        check('birthdate').trim().escape().not().isEmpty().withMessage('Birthdate cannot be empty').bail(),
        check('experience').trim().escape().not().isEmpty().withMessage('Experience cannot be empty').bail().isNumeric().withMessage('Experience must be a number (in years)').bail(),
        handleValidation
    ],
    studentUpdate: [
        check('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail().isEmail().withMessage('Email is invalid').bail().custom(value => {
            return Student.findOne({ email: value, _id: { $ne: req.params.id } }).then(student => { if(student) return Promise.reject('Email is already taken')} );
        }),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail().isLength({ min: 5 }).withMessage('Password must be minimum 5 characters').bail(),
        check('firstName').trim().escape().not().isEmpty().withMessage('First Name cannot be empty').bail().isLength({ min: 3 }).withMessage('First Name must be minimum 3 characters').bail(),
        check('lastName').trim().escape().not().isEmpty().withMessage('Last Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Last Name must be minimum 3 characters').bail(),
        check('birthdate').trim().escape().not().isEmpty().withMessage('Birthdate cannot be empty').bail(),
        check('experience').trim().escape().not().isEmpty().withMessage('Experience cannot be empty').bail().isNumeric().withMessage('Experience must be a number (in years)').bail(),
        handleValidation
    ],
}