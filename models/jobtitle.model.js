const mongoose = require("mongoose");
const Jobtitle = new mongoose.Schema(
  {
    jobTitlename: { type: String },
    depName: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdOn: { type: String, default: Date.now },
    chaptersAllocated: { type: String },
  },
  {
    collection: "jobtitles",
  }
);
const model = mongoose.model("JobtitleData", Jobtitle);
module.exports = model;
