var passport = require('passport');
var jwt = require('jwt-simple');

module.exports.login = (req, res, next) => {
    console.log(`Login Step 1 :  process begins`);
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.error(`Login Step 8 : Login Failed : Sending error response to user`);
            return res.status(400).json({
                err_message: err,
                response: "failed",
                response_message: info.message || "Login Failed"
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(`Login Step 6 : Passport login failed`);
                return next(err);
            }
            console.log(`Login Step 6 : Passport logged IN Success`);
            generateJwt(user, (err, token) => {
                if (err) {
                    console.error(`Login Step 8 : Login Failed : Sending Error response to user`);
                    res.status(400).json({
                        err_message: err,
                        response: "failed",
                        response_message: "Login Failed"
                    });
                } else {
                    console.log(`Login Step 8 : Login Successful`);
                    res.status(200).json({
                        data: token,
                        response: "success",
                        response_message: 'Login Successful'
                    });
                }
            });
        });
    })(req, res, next);
};

generateJwt = (user, callback) => {
    console.log(`Login Step 7 : GenerateJwt`);
    let userDetails = JSON.parse(JSON.stringify(user));
    return callback(null, jwt.encode(userDetails, '123456ABCDEF'));
};

