const express = require('express');
const authController = require('../controllers/auth.controller');
const studentController = require('../controllers/student.controller');
const validator = require('../middlewares/validators');
const { authenticate, authorize } = require('../middlewares/auth');

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
    .get(authorize, studentController.index)
    .post(authorize, validator.studentCreate, studentController.create);

apiRouterSecure.route('/students/:id')
    .get(authorize, studentController.read)
    .put(authorize, validator.studentUpdate, studentController.update)
    .delete(authorize, studentController.destroy);

module.exports = {
    apiRouter: apiRouter, 
    apiRouterSecure: apiRouterSecure
};