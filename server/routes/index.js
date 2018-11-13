var router = require('express').Router();

router.use('/', require('./login'));
router.use('/api', require('./api'));


let auth = require('./../controllers/login/auth');
router.use('/auth', auth);
router.use('/auth', require('./auth'));

router.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce((errors, key) => {
                errors[key] = err.errors[key].message;
                return errors;
            }, {})
        });
    }
    return next(err);
});

module.exports = router;