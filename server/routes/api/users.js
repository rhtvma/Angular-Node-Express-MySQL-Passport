const router = require('express').Router();

router.get('getAllUsers', (req, res, next) => {
    console.log(`getAllUsers`);
});

module.exports = router;
