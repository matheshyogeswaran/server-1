const mongoose = require("mongoose");

const deleteArticle = new mongoose.Schema(
  {
    chapterName: { 
      type: String, 
      required: true 
    },
    articleName: {
    type: String,
    required: true
  },
  articleDesc: {
    type: String,
    required: true
  },
  createdBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
  updated_at: {
    type: String,
     
  },
},
  {
    collection: "deletearticles",
  }
);

const model = mongoose.model("deleteArticleData", deleteArticle);
module.exports = model;