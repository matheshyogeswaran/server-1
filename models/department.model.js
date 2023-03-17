const mongoose = require("mongoose");
<<<<<<< HEAD
const Department = new mongoose.Schema(
  {
    depName: { type: String, required: true, unique: true },
    createdOn: { type: String, default: Date.now },
    createdBy: { type: String, required: true },
    jobTitles: { type: String },
=======

const Department = new mongoose.Schema(
  {
    depName: { type: String, required: true, unique: true },
    createdOn: { type: Date, default: Date.now },
    jobTitles: [{ jobTitle: { type: String } }],
>>>>>>> sagini
    reasons: [{ type: Object }],
  },
  {
    collection: "departments",
  }
);
<<<<<<< HEAD
=======

>>>>>>> sagini
const model = mongoose.model("DepartmentData", Department);
module.exports = model;
