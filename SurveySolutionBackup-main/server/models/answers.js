let mongoose = require('mongoose');

// create a model class
let Answers = mongoose.Schema({
    userId: Object,
    surveyId: Object,
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String
},
{
  collection: "answers"
});

module.exports = mongoose.model('Answers', Answers);