const mongoose = require("mongoose");

const KtSession = new mongoose.Schema(
  {
    //belongsToUnit: { type: mongoose.Schema.Types.ObjectId, ref: "UnitData" },
    belongsToUnit: { type: String },
    belongsToChapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChapterData",
    },
    sessionName: { type: String },
    sessionUrl: { type: String },
    overallRating: { type: Number, default: 0 },
    overallQuality: { type: Number, default: 0 },
    overallComm: { type: Number, default: 0 },
    overallClarity: { type: Number, default: 0 },
    overallKnowledgeAndSkill: { type: Number, default: 0 },
    createdBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
    ratings: [
      {
        userId: { type: mongoose.Types.ObjectId, ref: "UserData" },
        ratedOn: { type: Date, default: Date.now() },
        qualityRate: { type: Number },
        commRate: { type: Number },
        clarityRate: { type: Number },
        knowledgeAndSkillRate: { type: Number },
      },
    ],
    comments: [
      {
        addedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
        comment: { type: String },
        commentedOn: { type: Date, default: Date.now() },
        replies: [
          {
            addedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
            reply: { type: String },
            repliedOn: { type: Date, default: Date.now() },
          },
        ],
      },
    ],
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
