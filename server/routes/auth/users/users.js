const router = require('express').Router();
const UsersController = require('../../../controllers/users');

// http://localhost:3001/auth/users/getAllUsers
router.get('/getAllUsers', UsersController.getAllUsers);

router.post('/logout', UsersController.logout);

router.post('/createUser', UsersController.getAllUsers);
router.get('/getUserDetail', UsersController.getUserDetail);
router.put('/editUser', UsersController.editUser);
router.delete('/deleteUser', UsersController.deleteUser);

module.exports = router;