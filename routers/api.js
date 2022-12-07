const express = require('express');
const authController = require('../controllers/auth.controller');
const studentController = require('../controllers/student.controller');
const companyController = require('../controllers/company.controller');
const validator = require('../middlewares/validators');
const { authenticate, authorize, authorizeRoles } = require('../middlewares/auth');
const jobController = require('../controllers/job.controller');

const apiRouter = express.Router();
const apiRouterSecure = express.Router();

apiRouter.get('/', (req, res) => {
    res.status(200).send({
        message: 'You have reached the API service successfully!'
    });
});

apiRouter.route('/register/student').post(validator.authRegisterStudent, authController.registerStudent);
apiRouter.route('/register/company').post(validator.authRegisterCompany, authController.registerCompany);
apiRouter.route('/login').post(validator.authLogin, authController.login);
apiRouter.route('/logout').post(authController.logout);
apiRouter.route('/refresh').post(validator.authRefresh, authController.refresh);

apiRouterSecure.use(authenticate);

apiRouterSecure.route('/students')
    .get(authorizeRoles(['admin', 'company']), studentController.index)
    .post(authorize, validator.studentCreate, studentController.create);

apiRouterSecure.route('/students/:id')
    .get(authorizeRoles(['admin', 'company']), studentController.read)
    .put(authorize, validator.studentUpdate, studentController.update)
    .delete(authorize, studentController.destroy);

apiRouterSecure.route('/companies')
    .get(authorizeRoles(['admin', 'student']), companyController.index)
    .post(authorize, validator.companyCreate, companyController.create);

apiRouterSecure.route('/companies/:id')
    .get(authorizeRoles(['admin', 'student']), companyController.read)
    .put(authorize, validator.companyUpdate, companyController.update)
    .delete(authorize, companyController.destroy);

apiRouterSecure.route('/jobs')
    .get(jobController.index)
    .post(authorizeRoles(['company']), validator.jobCreate, jobController.create);

apiRouterSecure.route('/jobs/:id')
    .get(authorizeRoles(['admin', 'student']), jobController.read)
    .put(authorizeRoles(['company']), validator.jobUpdate, jobController.update)
    .delete(authorizeRoles(['admin', 'company']), authorize, jobController.destroy);

apiRouterSecure.route('/jobs/:id/apply')
    .patch(authorizeRoles(['student']), jobController.apply)

module.exports = {
    apiRouter: apiRouter, 
    apiRouterSecure: apiRouterSecure
};