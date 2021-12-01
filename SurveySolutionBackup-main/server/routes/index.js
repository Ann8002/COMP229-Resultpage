// Author: Survey Solutions 
// Course: COMP 229 Fall 2021
// Subject: PRoject 
// 


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let survey = require('../models/survey');

let passport = require('passport');

let jwt = require('jsonwebtoken');
let DB = require('../config/db');
let userModel = require('../models/user');
let User = userModel.User; // alias

/* -------------------------------------------------------------------------------------------------*/

router.get('/', (req, res, next) => {
  // find all survey in the survey collection
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let query = { endDate: {$gte : date} };
  survey.find(query, (err, survey) => {  

    if (err) {
      return console.error(err);
    }
    else {
      res.render('content/index', {title: 'Active Surveys', survey: survey , displayName: req.user ? req.user.displayName : ""});
    }
  });
});

/* --------------------------------------------------------------------------------------------------*/

/*
router.get('/', (req, res, next) => {
  // find all survey in the survey collection
  survey.find( (err, survey) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('content/index', {title: 'Active Surveys', survey: survey , displayName: req.user ? req.user.displayName : ""});
    }
  });
});
*/

/* GET Login page. */
router.get('/login', function(req, res, next) {
  // check if the user is already logged in
  if(!req.user) {
    res.render('auth/login', {
      title: "Login",
      message: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName: ""
    });
  }
  else {
    return res.redirect('/');
  }
});


/* POST Login page. */
router.post('/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    // server err?
    if(err) {
      return next(err);
    }
    // is there a user login error?
    if(!user) {
      req.flash('loginMessage', 'Authentication Error');
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      // server error?
      if(err) {
        return next(err);
      }


      return res.redirect('/survey');
    });
  })(req, res, next);
});

/* GET display register page */
router.get('/register', function(req, res, next) {
  // check if the user is not already logged in
  if(!req.user) {
    res.render('auth/register', {
      title: 'Register',
      displayName: req.user ? req.user.displayName : ""
    });
  }
  else {
    return res.redirect('/');
  }
});

/* POST process register page */
router.post('/register', function(req, res, next) {
  // instantiate a user object
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
    if(err) {
      console.log("Error: Inserting New User");
      if(err.name == "UserExistsError") {
          console.log('Error: User Already Exists!')
      }
      return res.render('auth/register', {
        title: 'Register',
        displayName: req.user ? req.user.displayName : ""
      });
    }
    else {
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/survey')
      });
    }
  });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;