const mongoose = require("mongoose");

const KtSession = new mongoose.Schema(
  {
    belongsToUnit: { type: mongoose.Schema.Types.ObjectId, ref: "UnitData" },
    belongsToChapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChapterData",
    },
    sessionName: { type: String },
    sessionDesc: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
    createdOn: { type: Date, default: Date.now },
    overallRating: { type: Number },
    overallQuality: { type: Number },
    overallComm: { type: Number },
    overallClarity: { type: Number },
    overallKnowledgeAndSkill: { type: Number },
     
  },
  {
    collection: "ktsessions",
  }
);

const model = mongoose.model("KtSessionData", KtSession);
module.exports = model;
