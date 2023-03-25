const mongoose = require("mongoose");
const Article = new mongoose.Schema(
  {
    belongsToChapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChapterData",
    },
    articleName: { type: String },
    articleDesc: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
    createdOn: { type: Date, default: Date.now },
    overallRating: { type: Number },
    overallQuality: { type: Number },
    overallComm: { type: Number },
    overallClarity: { type: Number },
    overallKnowledgeAndSkill: { type: Number },
     
  },
  {
    collection: "articles",
  }
);
 

const ArticleData = mongoose.models.ArticleData || mongoose.model('ArticleData', Article);
module.exports = ArticleData;