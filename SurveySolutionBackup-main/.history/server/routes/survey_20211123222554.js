

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let mongo = require('mongodb');
let ObjectID = mongo.ObjectId;

// define the survey model
let survey = require('../models/survey');
let answers = require('../models/answers');



/* GET survey List page. READ */
router.get('/', (req, res, next) => {
  // find all survey in the survey collection
  if(!req.user) {
    res.redirect("/login");
  }
  else {
    survey.find((err, survey) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.render('survey/index', {title: 'Survey', survey: survey});
      }
    });
  }
});


//  GET the Survey Details page in order to add a new Survey
router.get('/add', (req, res, next) => {
     res.render('survey/add', {title: 'Add Survey' });
});

// POST process the Survey Details page and create a new Survey - CREATE
router.post('/add', (req, res, next) => {

  let newSurvey = survey({
    "title" : req.body.title,
    "startDate" : req.body.startDate,
    "endDate" : req.body.endDate,
    "question1" : req.body.question1,
    "question2" : req.body.question2,
    "question3" : req.body.question3,
    "question4" : req.body.question4
  });
  survey.create(newSurvey, (err, survey) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      // refresh list
      res.redirect('/survey');
    }

  });
});

// GET the Survey Details page in order to edit an existing Survey
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    survey.findById(id, (err, surveyEdit) => {
      if (err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        res.render('survey/edit', {title: 'Edit Survey', survey: surveyEdit})
      }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    let id = req.params.id
    let updatedSurvey = survey({
      "_id" : id,
      "title" : req.body.title,
      "startDate" : req.body.startDate,
      "endDate" : req.body.endDate,
      "question1" : req.body.question1,
      "question2" : req.body.question2,
      "question3" : req.body.question3,
      "question4" : req.body.question4,
      

    });
    survey.updateOne({_id: id}, updatedSurvey, (err) =>{
        if(err)
        {
          console.log(err);
          res.end(err);
        }
        else
        {
            // refresh list
           res.redirect('/survey');
        }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    let id = req.params.id;

    survey.remove({_id: id}, (err) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
          // refresh list
          res.redirect('/survey');
      }
    });
});

router.get('/view/:id', (req, res, next) => {
  if(!req.user) {
    let id = req.params.id;

    survey.findById(id, (err, surveyEdit) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.render('survey/view', {title: 'View Survey', survey: surveyEdit, answers: false});
      }
    });
  } else {
    let surveyId = req.params.id;
    let userId = req.user.id;

    survey.findById(surveyId, (err, surveyEdit) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        answers.findOne({ $and : [{userId : userId}, {surveyId : surveyId}]}, function(err, ansRes) {
          if(err) {
            console.log(err);
            res.end(err);
          } else {
            res.render('survey/view', {title: 'View Survey', survey: surveyEdit, answers: ansRes});
          }
        });
      }
    });
  }
});

// POST - process the information passed from the details form and update the document
router.post('/view/:id', (req, res, next) => {
  if (!req.user) {
    let surveyId = req.params.id;
    let userId = new ObjectID();
    let ans1 = "";
    if (req.body.answerT1) ans1 = "TRUE";
    if (req.body.answerF1) ans1 = "FALSE";
    let ans2 = "";
    if (req.body.answerT2) ans2 = "TRUE";
    if (req.body.answerF2) ans2 = "FALSE";
    let ans3 = "";
    if (req.body.answerT3) ans3 = "TRUE";
    if (req.body.answerF3) ans3 = "FALSE";
    let ans4 = "";
    if (req.body.answerT4) ans4 = "TRUE";
    if (req.body.answerF4) ans4 = "FALSE";
    let updatedAnswers = {
      $set: {
        "userId": userId,
        "surveyId": surveyId,
        "answer1": ans1,
        "answer2": ans2,
        "answer3": ans3,
        "answer4": ans4,
      }
    };
    answers.updateOne({ $and: [{ userId: userId }, { surveyId: surveyId }] }, updatedAnswers, { upsert: true }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      }
      else {
        // refresh list
        res.redirect('/');
      }
    });
  } else {
    let surveyId = req.params.id;
    let userId = req.user.id;
    let ans1 = "";
    if (req.body.answerT1) ans1 = "TRUE";
    if (req.body.answerF1) ans1 = "FALSE";
    let ans2 = "";
    if (req.body.answerT2) ans2 = "TRUE";
    if (req.body.answerF2) ans2 = "FALSE";
    let ans3 = "";
    if (req.body.answerT3) ans3 = "TRUE";
    if (req.body.answerF3) ans3 = "FALSE";
    let ans4 = "";
    if (req.body.answerT4) ans4 = "TRUE";
    if (req.body.answerF4) ans4 = "FALSE";
    let updatedAnswers = {
      $set: {
        "userId": userId,
        "surveyId": surveyId,
        "answer1": ans1,
        "answer2": ans2,
        "answer3": ans3,
        "answer4": ans4,
      }
    };
    answers.updateOne({ $and: [{ userId: userId }, { surveyId: surveyId }] }, updatedAnswers, { upsert: true }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      }
      else {
        // refresh list
        res.redirect('/');
      }
    });
  }
});

// GET login page when selecting Answer Survey option
router.get('/login/:id', (req, res, next) => {
  let id = req.params.id;

  survey.findById(id, (err, surveyEdit) => {
    if (err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.render('survey/login', {title: 'Login', survey: surveyEdit})
    }
  });
  
});

module.exports = router;