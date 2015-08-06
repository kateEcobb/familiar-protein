var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  qNumber: {type: Number, unique: true},
  title: String,
  description: String
  // examples?
});

var Question = mongoose.model('Question', QuestionSchema);

// Set up some dummy initial data for now by hardcoding.
var questions = [
  {qNumber: 1, title: "Capital Words", description: "Find all capital words in a string." },
  {qNumber: 2, title: "Does a Word Contain One 'a'", description: "Validate whether the given word contains one and only one letter 'a'."},
  {qNumber: 3, title: "Find Prices", description: "Find all prices in the string."}
]

questions.forEach(function(element) {
  var newQ = new Question(element);
  newQ.save(function(err, data) {
    if (err) {
      console.log("Adding questions error: ", err);
    } else {
      console.log("Adding questions success: ", data);
    }
  });
});


module.exports = Question;
