const mongoose = require("mongoose");

const deleteQuestion = new mongoose.Schema(
  {
    unitName:{
      type: String,
    },
    quizname:{
      type: String,
    },
    question: {
    type: String,
    required: true
  },
  options: [
    {
      type: String,
      required: true
    }
  ],
  correctAnswer: {
    type: Number,
    required: true
  },
  createdBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
  updated_at: {
    type: String,
     
  },
},
  {
    collection: "deletequestions",
  }
);

const model = mongoose.model("deleteQuestionData", deleteQuestion);
module.exports = model;