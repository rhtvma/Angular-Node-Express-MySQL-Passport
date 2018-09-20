const router = require('express').Router();
const UsersController = require('../../controllers/users');

// http://localhost:3000/api/users/getAllUsers
router.get('/getAllUsers', UsersController.getAllUsers);
router.post('/signup', UsersController.signup);

module.exports = router;
