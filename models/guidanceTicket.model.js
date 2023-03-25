const mongoose = require("mongoose");
const GuidanceTicket = new mongoose.Schema(
  {
    requestedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
    requestTitle: { type: String },
    description: { type: String },
    attachment: { type: String },
    createdTime: { type: Date, default: Date.now() },
    status: { type: String, default: "requested" },
    isAssigned: { type: Boolean, default: false },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "UserData",
      default: null,
    },
    directedBy: {
      type: mongoose.Types.ObjectId,
      ref: "UserData",
      default: null,
    },
    directedDepartmentID: {
      type: mongoose.Types.ObjectId,
      ref: "DepartmentData",
    },
  },
  {
    collection: "guidanceTickets",
  }
);
const model = mongoose.model(" guidanceTicketData", GuidanceTicket);
module.exports = model;
