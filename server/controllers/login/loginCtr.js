var passport = require('passport');
var jwt = require('jwt-simple');

loginValidator =(body,cb)=>{
let errorMsg=[];
    if(body.email=='' || typeof body.email=='undefined'){
        errorMsg.push({email:"Email is required"});
    }
    if(body.password=='' || typeof body.password=='undefined'){
        errorMsg.push({password:"Password is required"});
    }

    cb(errorMsg);
}

module.exports.login = (req, res, next) => {
    console.log(`Login Step 1 :  process begins`);
//Validation goes here
    loginValidator(req.body,(err)=>{
        if(err.length > 0){
            return res.status(400).json({
                err_message: null,
                response: "error",
                response_message:err
            });
        }else{
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
        }
    });


};

generateJwt = (user, callback) =>{
let userData = {
    email : user.email,
    first_name : user.first_name,
    role : user.role,
    username : user.username,
    userID : user.userID
}

    console.log(`Login Step 7 : GenerateJwt`);
    let userDetails = JSON.parse(JSON.stringify(userData));
    return callback(null, jwt.encode(userDetails, '123456ABCDEF'));
};
