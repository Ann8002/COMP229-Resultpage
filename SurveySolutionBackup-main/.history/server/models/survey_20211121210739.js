let mongoose = require('mongoose');

// create a model class
let Survey = mongoose.Schema({
    title: String,
    startDate: Date,
    endDate: Date,
    question1: String,
    question2: String,
    question3: String,
    question4: String
    
},
{
  collection: "survey"
});

module.exports = mongoose.model('Survey', Survey);
