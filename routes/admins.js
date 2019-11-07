const express = require('express');
const router = express.Router();
const User = require('../models/user');
const HallAllocation = require('../models/hallAllocation');

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
router.get('/upload', (req, res)=>{
    res.render('upload', {
        title : 'Post Page',
        style : 'adminDashboard.css',
        script : 'adminDashboard.js'
    });
});

router.get('/showResults',(req, res)=>{
    HallAllocation.find({},(err, results)=>{
        if (err){
            return console.log(err);
        }
        res.render('showResults',{
        title : 'Result Page',
        style : 'adminDashboard.css',
        script : 'adminDashboard.js',
        results
        });
    });
});
router.post('/upload', (req, res)=>{
    let day1 = req.body.day1;
    let department1 = req.body.department1;
    let level1 = req.body.level1;
    let time1 = req.body.time1;
    let hall1 = req.body.hall1;
    let paper1 = req.body.paper1;
    let day2 = req.body.day2;
    let department2 = req.body.department2;
    let level2 = req.body.level2;
    let time2 = req.body.time2;
    let hall2 = req.body.hall2;
    let paper2 = req.body.paper2
    let day3 = req.body.day3;
    let department3 = req.body.department3;
    let level3 = req.body.level3;
    let time3 = req.body.time3;
    let hall3 = req.body.hall3;
    let paper3 = req.body.paper3;
    let day4 = req.body.day4;
    let department4 = req.body.department4;
    let level4 = req.body.level4;
    let time4 = req.body.time4;
    let hall4 = req.body.hall4;
    let paper4 = req.body.paper4;

    req.checkBody('day1','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('department1','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('level1','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('time1','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('hall1','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('day2','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('department2','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('level2','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('time2','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('hall2','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('day3','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('department3','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('level3','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('time3','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('hall3','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('day4','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('department4','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('level4','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('time4','Empty Text Field; Please Input A Value').notEmpty();
    req.checkBody('hall4','Empty Text Field; Please Input A Value').notEmpty();

    let err = req.validationErrors();
    if(err){
        console.log(err);
        req.session.errors = err;
        return res.render('upload',{
            title : 'Post Page',
            style : 'adminDashboard.css',
            script : 'adminDashboard.js',
            err : req.session.errors
        });
    }
    let hallAllocation = new HallAllocation({
        day1 : day1,
        department1 : department1,
        level1 : level1,
        time1 : time1,
        hall1 : hall1, 
        paper1 : paper1,
        day2 : day2,
        department2 : department2,
        level2 : level2,
        time2 : time2,
        hall2 : hall2,
        paper2 : paper2,
        day3 : day3,
        department3 : department3,
        level3 : level3,
        time3 : time3,
        hall3 : hall3,
        paper3 : paper3,
        day4 : day4,
        department4 : department4,
        level4 : level4,
        time4 : time4,
        hall4 : hall4,
        paper4 : paper4
    }); 
    console.log(hallAllocation)
    hallAllocation.save((err, results)=>{
        if(err){
            return console.log(err);
        }
        res.render('upload',{
            title : 'Post Page',
            style : 'adminDashboard.css',
            script : 'adminDashboard.js',
        });
    });
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