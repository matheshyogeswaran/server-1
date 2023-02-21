const mongoose = require("mongoose");
const Department = new mongoose.Schema(
  {
    depName: { type: String, required: true, unique: true },
    createdOn: { type: String, default: Date.now },
    createdBy: { type: String, required: true },
    jobTitles: { type: String },
    reasons: [{ type: Object }],
  },
  {
    collection: "departments",
  }
);
const model = mongoose.model("DepartmentData", Department);
module.exports = model;
