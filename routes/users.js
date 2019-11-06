const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

router.post('/login', (req, res, next) => {
    passport.authenticate('user', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('failure', 'Incorrect username or Password.');
            res.redirect('/');
        }

        req.logIn(user, (err) => {
            if (err) {
                return console.log(err);
            } else {
                let id = user._id;
                id = mongoose.Types.ObjectId(id);
                res.redirect('/users/gratuity/' + id);
            }
        });
    })(req, res, next);
});

router.get('/gratuity/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return console.log(err);
        } else {
            res.render('gratuity', {
                title: 'Customer Pension',
                style: 'gratuity.css',
                script: 'gratuity.js',
                user
            });
        }
    });
});

router.put('/updatePension/:id', (req, res) => {
    const body = req.body;
    const userInfo = {
        pension: body.pension,
        gratuity: body.gratuity,
        paid: 'Paid'
    };

    User.findOneAndUpdate({_id: req.params.id}, {
        $set: userInfo
    }, {new: true}, (err, updatedUser) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(updatedUser);
            res.end();
        }
    });
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;