const router = require('express').Router();
const LoginController = require('../controllers/login/loginCtr');
const UsersController = require('../controllers/users');


//http://localhost:3001/login
router.post('/login', LoginController.login);
//http://localhost:3001/signup
router.post('/signup', UsersController.signup);

module.exports = router;