const mongoose = require("mongoose");
const Jobtitle = new mongoose.Schema(
  {
    jobTitlename: { type: String, required: true, unique: true },
    depID: { type: mongoose.Types.ObjectId, ref: "DepartmentData" },
    createdBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
    createdOn: { type: Date, default: Date.now },
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
