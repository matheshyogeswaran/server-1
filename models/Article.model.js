const mongoose = require("mongoose");
const Article = new mongoose.Schema(
  {
    articleName: { type: String },
    overallRating: { type: Number },
    overallQuality: { type: Number },
    overallComm: { type: Number },
    overallClarity: { type: Number },
    overallKnowledgeAndSkill: { type: Number },
    createdBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
  },
  {
    collection: "articles",
  }
);
const model = mongoose.model(" ArticleData", Article);
module.exports = model;
