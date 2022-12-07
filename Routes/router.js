const express = require('express');
const authController = require('../Controllers/auth.controller')
const findById = require('../Controllers/findById.controller');
const deleteById = require('../Controllers/deleteById.controller')
const router = express.Router();

router.post('/job_portal/api/v1/auth/signup', authController.signup)
router.get('/job_portal/api/v1/auth/login', authController.login)
router.get('/job_portal/api/v1/auth/users/:id', findById.findById);
router.get('/job_portal/api/v1/auth/users/:id', deleteById.deleteById)
module.exports = router;