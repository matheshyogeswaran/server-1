const mongoose = require("mongoose");

const QuizSubmission = new mongoose.Schema(
  {
    quizBelongsToDepartmet:{type: String},
    chapterId: {type: String},
     
    unitId:{type: String},
    userId: {type: String},
    score: { type: Number },
     
    attemptedTime: { type: String },
     
    submittedTime: { type: String },
    questions: [
      {
        questionValue: { type: String },
        answers: [String],
        correctAnswer: { type: Number },
        submittedAnswer: { type: Number },
      },
    ],
  },
  {
    collection: "quizsubmissions",
  }
);

const model = mongoose.model("QuizSubmissionData", QuizSubmission);
module.exports = model;
