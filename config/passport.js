const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    passport.use('user', new LocalStrategy({
        usernameField: "loginID",
        passwordField: "loginPassword",
        passReqToCallback: true
      }, function verifyCallback(req, loginID, loginPassword, done) {
            User.findOne({ idNumber: loginID }, function(err, user) {
            if (err) return done(err);
            if (!user) {
                return done(null, false, {msg: 'No user found'});
            }
            if (!user.password === loginPassword) {
                return done (null, false, {msg: 'Incorrect Password'});
            } else {
                return done (null, user);
            }
            // bcrypt.compare(loginPassword, user.password, (err, isMatch) => {
            //     if (err) return done(err);
            //     if (!isMatch) {
            //         return done(null, false, {msg: 'Incorrect Password'});
            //     } else {
            //         return done(null, user);
            //     }
            // });
        });
    }));

    passport.use('admin', new LocalStrategy({
        usernameField: 'adminUsername',
        passwordField: 'adminPassword',
        passReqToCallback: true
    }, function verifyCallback (req, adminUsername, adminPassword, done) {
        Admin.findOne({username: adminUsername}, (err, admin) => {
            if (err) {
                return done (err);
            }

            if (!admin) {
                return done(null, false, {msg: 'No Admin found'});
            }
            bcrypt.compare(adminPassword, admin.password, (err, isMatch) => {
                if (err) {
                    return done(err);
                }
                if (!isMatch) {
                    return done (null, false, {msg: 'Incorrect Password'});
                } else {
                    return done(null, admin);
                }
            });
        });
    }));

    let SessionConstructor = function (userId, userGroup, details) {
        this.userId = userId;
        this.userGroup = userGroup;
        this.details = details;
    }

    passport.serializeUser(function (userObject, done) {
    let userGroup = "User";
    let userPrototype =  Object.getPrototypeOf(userObject);

    if (userPrototype === User.prototype) {
        userGroup = "User";
    } else if (userPrototype === Admin.prototype) {
        userGroup = "Admin";
    }

    let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
        done(null,sessionConstructor);
    });

    passport.deserializeUser(function (sessionConstructor, done) {
        if (sessionConstructor.userGroup == 'User') {
            User.findOne({
                _id: sessionConstructor.userId
            }, '-localStrategy.password', function (err, user) { 
                done(err, user);
            });
        } else if (sessionConstructor.userGroup == 'Admin') {
            Admin.findOne({
                _id: sessionConstructor.userId
            }, '-localStrategy.password', function (err, admin) {
                done(err, admin);
            });
        }
    });
};