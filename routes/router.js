const express = require('express');
const authController = require('../controllers/auth.controller');
const deleteById = require('../controllers/deleteById.controller');
const validate=require('../utilis/validate.token');
const isAdmin=require('../utilis/isAdmin');
const router= express.Router();

router.post('job_portal/api/v1/auth/signup', authController.signup);
router.post('job_portal/api/v1/auth/login', authController.login);
router.get('job_portal/api/v1/auth/user/:id', isAdmin, validate.tokenValidation, deleteById.deleteById);


module.exports=router;