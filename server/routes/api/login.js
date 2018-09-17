const router = require('express').Router();
const LoginController = require('../../controllers/login/loginCtr');


// http://localhost:3000/api/users/login
router.post('*', LoginController.login);

module.exports = router;
