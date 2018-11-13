var router = require('express').Router();

router.use('/users', require('./users/users'));
router.use('/sites', require('./sites/sites'));
router.use('/events', require('./events/events'));

module.exports = router;