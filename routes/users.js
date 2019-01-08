const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let myUser = require('../models/user');

// Registration Form Get
router.get('/register', (req, res) => {
    res.render('register');
});

// Registration Form Post
router.post('/register', (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const nickname = req.body.nickname;
    const pwd = req.body.pwd;
    const pwd2 = req.body.pwd2;

    req.checkBody('username', 'Name is required').notEmpty();
    req.checkBody('email', 'E-mail is reqiured').notEmpty();
    req.checkBody('email', 'E-mail is not valid').isEmail();
    req.checkBody('nickname', 'Nick is required').notEmpty();
    req.checkBody('pwd', 'Password is required').notEmpty();
    req.checkBody('pwd2', 'Passwords do not match').equals(req.body.pwd);

    let errors = req.validationErrors();

    if(errors){
        res.render('register', {
            errors: errors
        });
    }
    else{
        let newUser = new myUser({
            username: username,
            email: email,
            nickname: nickname,
            password: pwd
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash)=> {
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save((err)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    else{
                        req.flash('success', 'You are now registered')
                        res.redirect('login');
                    }
                });
            });
        });
    }
});

// Login Form Get

router.get('/login', (req, res) => {
    res.render('login');
});

// Login Form Post

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// ***************** MODAL *******************
// Registration Form Post
router.post('/mdregister', (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const nickname = req.body.nickname;
    const pwd = req.body.pwd;
    const pwd2 = req.body.pwd2;

    req.checkBody('username', 'Name is required').notEmpty();
    req.checkBody('email', 'E-mail is reqiured').notEmpty();
    req.checkBody('email', 'E-mail is not valid').isEmail();
    req.checkBody('nickname', 'Nick is required').notEmpty();
    req.checkBody('pwd', 'Password is required').notEmpty();
    req.checkBody('pwd2', 'Passwords do not match').equals(req.body.pwd);

    let errors = req.validationErrors();

    if(errors){
        res.render('register', {
            errors: errors
        });
    }
    else{
        let newUser = new myUser({
            username: username,
            email: email,
            nickname: nickname,
            password: pwd
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash)=> {
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save((err)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    else{
                        req.flash('success', 'You are now registered')
                        res.redirect('login');
                    }
                });
            });
        });
    }
});

// Login Form Post

router.post('/mdlogin', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:'/',
        successFlash:"You're logged in...",
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// ***************** MODAL *******************

// Logout link Get

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out.')
    res.redirect('/users/login');
});

module.exports = router;