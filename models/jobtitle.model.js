const mongoose = require("mongoose");
const Jobtitle = new mongoose.Schema(
  {
    jobTitlename: { type: String, required: true, unique: true },

    depID: { type: String },
    createdBy: { type: String, required: true },
    createdOn: { type: String, default: Date.now },
    chaptersAllocated: { type: String },
    // chaptersAllocated: { type: Schema.Types.ObjectId, ref: "ChapterData" },
    reasons: [{ type: Object }],
  },
  {
    collection: "jobtitles",
  }
);
const model = mongoose.model("JobtitleData", Jobtitle);
module.exports = model;
