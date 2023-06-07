const mongoose = require("mongoose");

const ScoreEditLog = new mongoose.Schema(
  {
    projectName: { type: String },
    submittedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
    score: [{ type: Number }],
    feedback: [{ type: String }],
    show: [{ type: Boolean }],
    upgradedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
    upgradedOn: [{ type: Date, default: Date.now() }],
  },
  { collection: "scoreeditlog" }
);

const model = mongoose.model("ScoreEditLogData", ScoreEditLog);
module.exports = model;
