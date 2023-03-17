const mongoose = require("mongoose");
<<<<<<< HEAD
const Chapter = new mongoose.Schema(
  {
    chapterName: { type: String, required: true, unique: true },
    depID: { type: String },
    createdBy: { type: String, required: true },
    createdOn: { type: String, default: Date.now },
    offeredInJobTitles: { type: String },
    reasons: [{ type: Object }],
=======

const Chapter = new mongoose.Schema(
  {
    chapterName: { type: String, required: true, unique: true },
    createdOn: { type: Date, default: Date.now },
    reasons: [{ type: Object }],
    unitsOffer: [{ type: mongoose.Types.ObjectId, ref: "units" }],
>>>>>>> sagini
  },
  {
    collection: "chapters",
  }
);
<<<<<<< HEAD
=======

>>>>>>> sagini
const model = mongoose.model("ChapterData", Chapter);
module.exports = model;
