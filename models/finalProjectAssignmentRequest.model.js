const mongoose = require("mongoose");

const FinalProjectAssignmentRequest = new mongoose.Schema(
  {
    hiredEmployeeID: { type: mongoose.Types.ObjectId, ref: "UserData" },
    requestedOn: { type: String },
  },
  {
    collection: "finalprojectassignmentrequests",
  }
);

const model = mongoose.model("FinalProjectAssignmentRequestData", FinalProjectAssignmentRequest);
module.exports = model;