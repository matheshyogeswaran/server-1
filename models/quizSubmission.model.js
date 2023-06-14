const mongoose = require("mongoose");

const QuizSubmission = new mongoose.Schema(
  {
    quizBelongsToDepartmet: {
      type: mongoose.Types.ObjectId,
      ref: "DepartmentData",
    },
    chapterId: { type: mongoose.Types.ObjectId, ref: "ChapterData" },

    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "UnitData" },
    userId: { type: mongoose.Types.ObjectId, ref: "UserData" },
    score: { type: Number },
    correctAnsCount: { type: Number },
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
    badgeGiven: { type: Boolean, default: false },
  },
  {
    collection: "quizsubmissions",
  }
);

const model = mongoose.model("QuizSubmissionData", QuizSubmission);
module.exports = model;
