const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', (req, res) => {
    let body = req.body;
    const login = {
        username: body.adminUsername,
        password: body.adminPassword
    };
    const adminUsername = 'admin';
    const password1 = 'younow';
    const password2 = 'askme';

    req.checkBody('adminUsername', 'username is required').notEmpty();
    req.checkBody('adminPassword', 'Password is required').notEmpty();

    let adminErrors = req.validationErrors();

    if (adminErrors) {
        res.render('index', {
            title: 'NCP Pensions - Home',
            style: 'index.css',
            script: 'index.js',
            adminUsername: login.username,
            adminPassword: login.password,
            adminErrors
        });
    } else if ((login.username === adminUsername) && (login.password === password1 || login.password === password2)) {
        res.redirect('/admins/dashboard');
    } else {
        req.flash('failure', 'Incorrect Username');
        res.render('index', {
            title: 'NCP Pensions - Home',
            style: 'index.css',
            script: 'index.js',
            adminUsername: login.username,
            adminPassword: login.password,
            adminLoginError: 'Incorrect Username or Password'
        });
    }
});
router.get('/dashboard', (req, res) => {
    let id = 'NCP-';
    for (var i = 0; i < 5; i++) {
        var number = Math.floor(Math.random() * 5);
        id = `${id}${number}`;
    }
    User.find({}, (err, users) => {
        if (err) return console.log(err);
        res.render('adminDashboard', {
            title: 'Admin Dashboard',
            style: 'adminDashboard.css',
            script: 'adminDashboard.js',
            admin: true,
            idNumber: id,
            users
        });
    });
});

router.post('/personalInfo', (req, res) => {
    const body = req.body;
    const userPersonalInfo = {
        firstName: body.firstName,
        lastName: body.lastName,
        contactAddress: body.contactAddress,
        permanentAddress: body.permanentAddress,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
        maritalStatus: body.maritalStatus,
        religion: body.religion,
        phoneNumber: body.phoneNumber,
        nic: body.nic,
        fatherName: body.fatherName,
        motherName: body.motherName,
        spouseName: body.spouseName,
        childrenNumber: body.childrenNumber,
        stateOfOrigin: body.stateOfOrigin,
        lga: body.lga,
        dateOfJoin: body.dateOfJoin,
        dateOfConf: body.dateOfConf,
        idNumber: body.idNumber,
        password: body.password
    };
    const user = new User(userPersonalInfo);
    user.save((err) => {
        if (err) return console.log(err);
        res.end();
    });
});

router.put('/nextOfKinInfo', (req, res) => {
    const body = req.body;
    const userNextOfKinInfo = {
        nextOfKFirstName: body.nextOfKFirstName,
        nextOfKLastName: body.nextOfKLastName,
        nextOfKContactAddress: body.nextOfKContactAddress,
        nextOfKPermanentAddress: body.nextOfKPermanentAddress,
        nextOfKGender: body.nextOfKGender,
        nextOfKDateOfBirth: body.nextOfKDateOfBirth,
        nextOfKMaritalStatus: body.nextOfKMaritalStatus,
        nextofKReligion: body.nextofKReligion,
        nextOfKPhone: body.nextOfKPhone,
        nextOfKNIC: body.nextOfKNIC,
        nextOfKFatherName: body.nextOfKFatherName,
        nextOfKMotherName: body.nextOfKMotherName,
        nextOfKSpouse: body.nextOfKSpouse,
        nextOfKChildrenNumber: body.nextOfKChildrenNumber,
        nextOfKState: body.nextOfKState,
        nextOfKLGA: body.nextOfKLGA
    };
    const firstName = body.firstName;
    const lastName = body.lastName;
    User.findOneAndUpdate({firstName, lastName}, {
        $set: userNextOfKinInfo
    }, {new: true}, (err, updatedUser) => {
        if (err) {
            return console.log(err);
        } else {
            res.end();
        }
    });
});
router.put('/qualificationInfo', (req, res) => {
    const body = req.body;
    const userQualification = {
        oLevel: body.oLevel,
        aLevel: body.aLevel,
        sports: body.sports,
        otherSkills: body.otherSkills,
        salary: body.salary,
        bank: body.bank,
        accountNumber: body.accountNumber,
        deduction: body.deduction,
        sortCode: body.sortCode,
        duration: body.duration,
        firstName: body.firstName,
        lastName: body.lastName
    };
    const firstName = body.firstName;
    const lastName = body.lastName;

    User.findOneAndUpdate({firstName, lastName}, {
        $set: userQualification
    }, {new: true}, (err, updatedUser) => {
        if (err) {
            return console.log(err);
        } else {
            res.end();
        }
    });
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;