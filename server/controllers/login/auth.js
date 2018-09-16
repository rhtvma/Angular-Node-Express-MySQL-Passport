let expressJwt = require('express-jwt');
let auth = expressJwt({
    secret: '123456ABCDEF',
    userProperty:'payload'
});

module.exports = auth;
