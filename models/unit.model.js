const mongoose = require("mongoose");

const Unit = new mongoose.Schema(
  {
    unitName: { type: String },
    belongsToChapter: { type: mongoose.Types.ObjectId, ref: "ChapterData" },
  },
  {
    collection: "units",
  }
);

const model = mongoose.model("UnitData", Unit);
module.exports = model;
