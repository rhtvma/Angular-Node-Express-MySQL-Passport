const router = require('express').Router();
const LoginController = require('../../controllers/login/loginCtr');
const UsersController = require('../../controllers/users');


// http://localhost:3000/api/users/login
router.post('/login', LoginController.login);
router.post('/signup', UsersController.signup);

module.exports = router;
