const mongoose = require("mongoose");

const ScoreEditLog = new mongoose.Schema(
  {
    projectName: { type: String },
    submittedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
    score: [{ type: Number }],
    upgradedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
    upgradedOn: [{ type: Date, default: Date.now() }],
    upgradedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
  },
  { collection: "scoreeditlog" }
);

const model = mongoose.model("ScoreEditLogData", ScoreEditLog);
module.exports = model;
