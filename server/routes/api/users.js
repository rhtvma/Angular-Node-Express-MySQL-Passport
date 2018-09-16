const router = require('express').Router();

router.get('/:productID', function (req, res, next) {
    const productID = req.params.productID;
    const metaData = {"title": 'product one Dummy image', "id": '21321lefh8wefwiefniewjfwe0f0ewfu3fub3ubf'}
});

module.exports = router;
