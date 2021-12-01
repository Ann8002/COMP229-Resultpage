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

/* GET home page. wildcard 
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    survey: 'survey',
    
   });
});
*/
router.get('/', (req, res, next) => {
  // find all survey in the survey collection
   survey.find( (err, survey) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('content/index', {title: 'Active Surveys', survey: survey });
    }
  });

});



/* GET Login page. */
router.get('/login', function(req, res, next) {
  res.render('auth/login', { title: 'Login'});
});

/* POST Login page. */
router.post('/login', function(req, res, next) {
  res.render('auth/login', { title: 'Login'});
});

/* GET display register page */
router.get('/register', function(req, res, next) {
  res.render('auth/register', { title: 'Register'});
});

/* POST process register page */
router.post('/register', function(req, res, next) {
  res.render('auth/register', { title: 'Register'});
});

module.exports = router;
