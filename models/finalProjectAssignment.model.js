const mongoose = require("mongoose");

const FinalProjectAssignment = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "UserData", required: true },
    projScore: { type: Number, required: true, default: 0 },
    feedback: { type: String },
    gradedOn: { type: Date, default: Date.now() },
    gradedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
    submittedDate: { type: Date, default: Date.now() },
    submittedFile: { type: String },
    status: { type: Boolean, default: false },
  },
  {
    collection: "finalprojectassignments",
  }
);

const model = mongoose.model(
  "FinalProjectAssignmentData",
  FinalProjectAssignment
);
module.exports = model;
