const mongoose = require("mongoose");
const Department = new mongoose.Schema(
  {
    depName: { type: String, required: true, unique: true },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    jobTitles: [{ jobTitle: { type: String } }],
    reasons: [{ type: Object }],
  },
  {
    collection: "departments",
  }
);

const model = mongoose.model("DepartmentData", Department);
module.exports = model;