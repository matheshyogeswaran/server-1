const mongoose = require("mongoose");
const Chapter = new mongoose.Schema(
  {
    chapterName: { type: String, required: true, unique: true },
    depID: { type: String },
    createdBy: { type: String, required: true },
    createdOn: { type: String, default: Date.now },
    offeredInJobTitles: { type: String },
    reasons: [{ type: Object }],
  },
  {
    collection: "chapters",
  }
);
const model = mongoose.model("ChapterData", Chapter);
module.exports = model;
