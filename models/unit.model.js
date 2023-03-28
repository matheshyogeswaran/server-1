const mongoose = require("mongoose");

const Unit = new mongoose.Schema(
  {
         
    belongsToChapter: { type: mongoose.Types.ObjectId, ref: "ChapterData" },
    unitName: { type: String },
    unitDesc: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
    createdOn: { type: Date, default: Date.now },
    status: { type: String, default: "active" },
    quiz: {      
      _id: {          
        type: mongoose.Schema.Types.ObjectId,
        auto: true,     
      },
      quizName: {
        type: String,     
      },
      quizDesc: {
          type: String,   
        },
      questions: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
            unique: true,
          },
          question: {
            type: String,   
          },
          op1: {
            type: String,   
          },
          op2: {
            type: String,   
          },
          op3: {
            type: String,   
          },
          op4: {
            type: String,   
          }, 
          correctAnswer: {
            type: Number,   
          },
          createdBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
          createdOn: { type: Date, default: Date.now },
        },
      ],
    },
  },
  {
    collection: "units",
  }
);

const model = mongoose.model("UnitData", Unit);
module.exports = model;