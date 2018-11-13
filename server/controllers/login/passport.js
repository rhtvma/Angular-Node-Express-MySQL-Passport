var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const Helper = require('../../services/helper'),
    DB = require('../../services/db-service'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs');

getUserByUsername = (email, callback) => {
    console.log(`Login Step 3 :  Username validation begins`);
    let findQuery = 'SELECT id, id AS userID, email, hash, username, first_name, role, user_type, status, isPassReset, created_on FROM users WHERE email = ?'
    DB.executeQuery(findQuery, [email], (err, rows) => {
        if (err) {
            console.log(err.name + ': ' + err.message);
            callback(err, null);
        }
        else {
            if (rows.length > 0) {
                let user = rows[0];
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    })
}

comparePassword = (candidatePassword, hash, callback) => {
    console.log(`Login Step 4 :  Password validation begins`);
    if (candidatePassword && hash) {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw err;
            callback(null, isMatch);
        });
    } else {
        callback(null, null);
    }
}

// serialize sessions
passport.serializeUser((user, done) => {
    console.log(`Login Step 5 :  Serialize sessions`);
    let sessionData = {};
    sessionData.user = user.userID;
    // store workingAt to build socket.io rooms
    if (user.username) {
        sessionData.username = user.username;
    }
    // console.log(req.session.passport.user);
    done(null, sessionData);
});

// deserialize sessions
passport.deserializeUser((sessionData, done) => {
    console.log(`Login Step 9 :  Deserialize sessions`);
    getUserByUserID(sessionData.user, (err, user) => {
        if (err) {
            done(err);
        } else {
            done(null, user);
        }
    });
});
getUserByUserID = (id, callback) => {
    console.log(`Login Step 10 :  Validate user by user ID`);
    let findQuery = 'SELECT id, id AS userID, email, hash, username, first_name,  role, user_type, status, isPassReset, created_on FROM users WHERE id = ?';
    DB.executeQuery(findQuery, [id], (err, rows) => {
        console.log('getUserByUserID', id, err, rows);
        if (err) {
            console.log(err.name + ': ' + err.message);
            callback(err, null);
        }
        else {
            if (rows.length > 0) {
                let user = rows[0];
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    })
}
// use local strategy
passport.use(
    new LocalStrategy
    (
        { //If your form contains diff name
             usernameField: 'email',
             passwordField: 'password'
        },
        // {passReqToCallback: true},
        (username, password, done) => {
            console.log(`Login Step 2 :  Passport LocalStrategy`);
            getUserByUsername(username, (err, user) => {
                if (err) {
                    console.error(`Login Step 3.1 : Username validation failed`);
                    return done(err);
                }
                if (!user) {
                    console.error(`Login Step 3.1 : Username validation failed`);
                    return done(null, false, {message: 'Incorrect username'});
                }
                console.log(`Login Step 3.1 : Username validation Success`);
                comparePassword(password, user.hash, (err, isMatch) => {
                        if (err) {
                            console.error(`Login Step 4.1 : Password validation failed`);
                            return done(null, false, {message: 'Incorrect password.'});
                        }
                        if (isMatch) {
                            console.log(`Login Step 4.1 : Password validation Success`);
                            return done(null, user);
                        } else {
                            console.error(`Login Step 4.1 : Password validation failed`);
                            return done(null, false, {message: 'Incorrect password.'});
                        }
                    }
                )
            });
        }
    )
);