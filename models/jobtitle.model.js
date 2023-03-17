const mongoose = require("mongoose");
const Jobtitle = new mongoose.Schema(
  {
    jobTitlename: { type: String, required: true, unique: true },
    createdOn: { type: Date, default: Date.now },
    reasons: [{ type: Object }],
  },
  {
    collection: "jobtitles",
  }
);
const model = mongoose.model("JobtitleData", Jobtitle);
module.exports = model;
