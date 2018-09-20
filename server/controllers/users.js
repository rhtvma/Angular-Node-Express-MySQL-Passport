const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Helper = require('../services/helper'),
    DB = require('../services/db-service'),
    async = require('async'),
    validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

// Register user via admin
exports.signup = (req, res) => {
    const email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        first_name = req.body.firstname,
        last_name = req.body.lastname,
        hash = bcrypt.hashSync(password, 10);
    async.waterfall([
            async.apply((callback) => {
                let insQuery = 'SELECT * FROM users WHERE email=?';
                DB.executeQuery(insQuery, [email], (err, rows) => {
                    if (err) {
                        callback({message: 'User already exists'}, null)
                    } else {
                        if (rows.length > 0) {
                            callback(null, false)
                        } else {
                            callback(null, true)
                        }
                    }
                });
            }),
            async.apply((isUserValid, callback) => {
                if (isUserValid) {
                    let insQuery = 'INSERT INTO users (email, username, hash, first_name,last_name) values (?,?,?,?,?)';
                    DB.executeQuery(insQuery, [email, username, hash, first_name, last_name], (err, rows) => {
                        if (err) {
                            callback({
                                data: err,
                                msg: err.message
                            }, null)
                        } else {
                            callback(null, rows)
                        }
                    });
                } else {
                    callback({message: 'User already exists'}, null)
                }
            })],
        (err, result) => {
            if (err) {
                console.error('Account creation failed');
                res.status(400).json({
                    err_message: err,
                    response: "failed",
                    response_message: "Account creation failed"
                });
            } else {
                console.log('Account created successfully');
                res.status(200).json({
                    data: result,
                    response: "success",
                    response_message: 'Account created successfully'
                });
            }
        })
}

// Register User
exports.deleteUser = (req, res) => {
    let userID = req.body.userID;
    let insQuery = 'DELETE FROM users WHERE id = ?';
    DB.executeQuery(insQuery, [userID], (err, rows) => {
        if (err) {
            console.error("User account delectation failed");
            res.status(400).json({
                err_message: err,
                response: "failed",
                response_message: "User account delectation failed due to product mapping"
            });
        } else {
            console.log('User account deleted successfully');
            res.status(200).json({
                data: null,
                response: "success",
                response_message: 'User account deleted successfully'
            });
        }
    });
};
// Update User Account
exports.editUserAccount = function (req, res) {
    let userID = req.body.userID;
    let profile = req.body.profile;
    let typeMsg = '';
    if (req.body.changeType === 'account') {
        typeMsg = 'Account details updated successfully';
        console.log(typeMsg);
    }
    if (req.body.profile.password) {
        if (req.body.profile.password) {
            let hash = bcrypt.hashSync(req.body.profile.password, 10);
            profile.hash = hash;
            delete profile['password'];
        }
    }
    let insQuery = 'UPDATE users SET ? where id = ?';
    DB.executeQuery(insQuery, [profile, userID], (err, rows) => {
        if (err) {
            console.error('Error while user account updating');
            res.status(400).json({
                err_message: err,
                response: "failed",
                response_message: 'Error while user account updating'
            });
        } else {
            console.log(typeMsg || 'Success');
            res.status(200).json({
                data: rows,
                response: "success",
                response_message: typeMsg || 'Success'
            });
        }
    });
}
;
exports.logout = function (req, res) {
    req.logout();
    console.log('User logged out successfully');
    res.status(200).json({
        data: null,
        response: "success",
        response_message: 'User logged out successfully'
    });
};

exports.getAllUsers = (req, res) => {
    let getQuery = 'select * from users';
    DB.executeQuery(getQuery, (err, data) => {
        if (err) {
            res.status(400).json({
                err_message: 'Not able to fetch Users list',
                response: "failed",
                response_message: 'Not able to fetch Users list' || err
            });
        } else {
            res.status(200).json({
                data: data,
                response: "success",
                response_message: 'Successfully fetched all Users'
            });
        }
    });
};

exports.passwordReset = (req, res) => {
    const email = req.body.email;
    async.waterfall([
        async.apply((callback) => {
            var selQuery = "SELECT * FROM users WHERE email = ?";
            DB.executeQuery(selQuery, [email], (err, rows) => {
                if (err) {
                    callback("Error while validating user", null);
                }
                var options = {};
                if (rows.length == 0) {
                    callback('User does not exist !', null);
                } else if (rows.length > 0) {
                    options = {
                        email: req.body.email,
                        user_id: rows[0].id || ''
                    }
                    callback(null, options)
                } else {
                    options = {};
                    callback('User does not exist !', options)
                }
            });
        }),
        async.apply((options, callback) => {
            if (options) {
                // const randomString = Helper.randomString(5);
                const token = Helper.uuid5();
                var insQuery = "INSERT INTO password_recovery (user_id, token) VALUES (?,?)";
                DB.executeQuery(insQuery, [options.user_id, token], (err, rows) => {
                    if (err) {
                        return callback("Error while validating user", null);
                    }
                    var mailOptions = {
                        from: 'RHTVMA Support<info@rhtvma.com>',
                        // from: 'rhtvma Support<rhtvma-support@gmail.com>',
                        to: options.email,
                        subject: 'rhtvma password recovery ',
                        text: 'This is email from rhtvma',
                        html: '<p>Click <a href="https://' + config.get('environment.live') + '/#/password-change/' + token + '/' + options.user_id + '">here</a> to reset your rhtvma user password</p>'
                    }
                    callback(null, options, mailOptions);
                });
            }
        }),
        async.apply((options, mailOptions, callback) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    callback('Error sending message', null);
                    return;
                } else {
                    console.log('Email sent: TO ' + options.email + ', Mail Response :  ' + info.response);
                }
                callback(null, 'Email sent to ' + options.email);
            });
        })
    ], (err, result) => {
        if (err) {
            console.error('Password reset Failed');
            res.status(400).json({
                err_message: err,
                response: "failed",
                response_message: err || "Password reset Failed"
            });
        } else {
            console.log('Password reset is successful');
            res.status(200).json({
                data: result,
                response: "success",
                response_message: result || 'Password reset is successful'
            });
        }
    });
};


exports.passwordChange = (req, res) => {
    const password = req.body.password,
        confirmP = req.body.cpassword,
        token = req.body.gID,
        id = req.body.userID;
    if (!validator.isEmpty(password) && !validator.isEmpty(token)) {
        if (password !== confirmP) {
            return res.status(400).json({
                data: '',
                msg: 'Passwords do not match'
            });
        }
        async.waterfall([
            async.apply((callback) => {
                var selQuery = "SELECT EXISTS(SELECT 1 FROM password_recovery WHERE user_id = ? AND token = ?) AS is_exists";
                DB.executeQuery(selQuery, [id, token], (err, rows) => {
                    var options = {};
                    if (err) {
                        callback(err, rows);
                    }
                    if (rows.length > 0) {
                        if (!rows[0].is_exists) {
                            const error = 'Invalid access';
                            callback(error, null);
                        } else {
                            options = {
                                user_id: id
                            }
                            callback(err, options);
                        }
                    } else {
                        callback('Server Error', null)
                    }
                    ;
                });
            }),
            async.apply((options, callback) => {
                var selQuery = "SELECT IF (ABS(TIMESTAMPDIFF(MINUTE, created_at, CURRENT_TIMESTAMP)) <= 60, 'No', 'Yes') AS expired FROM password_recovery WHERE user_id = ? AND token = ?";
                DB.executeQuery(selQuery, [options.user_id, token], (err, rows) => {
                    if (err) {
                        callback(err, rows)
                    }
                    if (rows.length == 0) {
                        const error = 'Invalid access!';
                        callback(error, rows)
                    } else if (rows.length > 0) {
                        if (rows[0].expired !== 'No') {
                            const error = 'Token expired';
                            callback(error, null);
                        } else {
                            const opt = {
                                user_id: options.user_id
                            }
                            callback(err, opt);
                        }
                    } else {
                        callback('Server Error', null);
                    }
                    ;
                });
            }),
            async.apply((options, callback) => {
                let hash = bcrypt.hashSync(password, 10);
                var spQuery = "UPDATE users SET hash=?, isPassReset = ? WHERE id = ?";
                DB.executeQuery(spQuery, [hash, true, options.user_id], (e, rows) => {
                    if (e) {
                        console.log('Error');
                        const error = 'Server error';
                        callback(error, rows)
                    } else {
                        console.log('Password changed ');
                        const success = 'Password changed successfully';
                        callback(null, success)
                    }
                });
            })
        ], (err, result) => {
            if (err) {
                console.error('Password change Failed');
                res.status(400).json({
                    err_message: err,
                    response: "failed",
                    response_message: "Password change Failed"
                });
            } else {
                console.log('Password change is successful');
                res.status(200).json({
                    data: result,
                    response: "success",
                    response_message: 'Password change is successful'
                });
            }
        });
    } else {
        console.log("Please validate user inputs:  1. Product Id =", productid, ", 2. email Id : ", emailid, ", 3. licence Key : ", licencekey);
        // res.send({error: 'Validation failed, Inputs are not valid'});
        if (err) {
            res.status(400).json({
                data: '',
                msg: 'Validation failed, Inputs are not valid'
            });
        }
    }
};

exports.userAccountDetails = (req, res) => {
    const userID = req.params.id;
    const getQuery = 'SELECT id, email, username, first_name, middle_name, last_name, role, status, isPassReset, created_on, modified_on, user_type, address1, address2, address3, state, postal_code, city, phone FROM users WHERE users.id = ?'
    DB.executeQuery(getQuery, [userID], (err, data) => {
        if (err) {
            console.error("User account details fetch Failed");
            res.status(400).json({
                err_message: err,
                response: "failed",
                response_message: "User account details fetch Failed"
            });
        } else {
            console.log('User account details fetched successfully');
            res.status(200).json({
                data: data ? data[0] : [] || {},
                response: "success",
                response_message: 'User account details fetched successfully'
            });
        }
    })
};
