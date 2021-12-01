

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the survey model
let survey = require('../models/survey');



/* GET survey List page. READ */
router.get('/', (req, res, next) => {
  // find all survey in the survey collection
  survey.find( (err, survey) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('survey/index', {title: 'survey', survey: survey});
    }
  });

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
     "question4" : req.body.question4,
    
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
  let id = req.params.id;

  survey.findById(id, (err, surveyEdit) => {
    if (err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.render('survey/view', {title: 'View Survey', survey: surveyEdit})
    }
  });
  
});

// POST - process the information passed from the details form and update the document
router.post('/view/:id', (req, res, next) => {

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
         res.redirect('/');
      }
  });

});



module.exports = router;