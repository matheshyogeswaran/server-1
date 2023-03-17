const mongoose = require("mongoose");
const Article = new mongoose.Schema(
  {
    articleName: { type: String },
    overallRating: { type: String },
    overallQuality: { type: String },
    overallComm: { type: String },
    overallClarity: { type: String },
    overallKnowledgeAndSkill: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, ref: "users" },
  },
  {
    collection: "articles",
  }
);
const model = mongoose.model(" ArticleData", Article);
module.exports = model;
