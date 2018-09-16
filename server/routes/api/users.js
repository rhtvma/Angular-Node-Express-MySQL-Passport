const router = require('express').Router();
const usersController = require('../../controllers/users');


// http://localhost:3000/api/users/getAllUsers
router.get('/getAllUsers', usersController.getAllUsers);

module.exports = router;
