const mongoose = require("mongoose");

const Chapter = new mongoose.Schema(
  {
    chapterName: { type: String, required: true, unique: true },
    createdOn: { type: Date, default: Date.now },
    reasons: [{ type: Object }],
    unitsOffer: [{ type: mongoose.Types.ObjectId, ref: "units" }],
  },
  {
    collection: "chapters",
  }
);

const model = mongoose.model("ChapterData", Chapter);
module.exports = model;
