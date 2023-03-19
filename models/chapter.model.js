const mongoose = require("mongoose");
const { Schema } = mongoose;
const Chapter = new mongoose.Schema(
  {
    chaptername: { type: String, required: true, unique: true },
    depID: { type: Schema.Types.ObjectId, ref: "DepartmentData" },
    createdBy: { type: String, required: true },
    createdOn: { type: String, default: Date.now },
    offeredInJobTitles: { type: String },
    reasons: [{ type: Object }],
    requested: [{ type: Schema.Types.ObjectId, ref: "UserData" }],
    accepted: [{ type: Schema.Types.ObjectId, ref: "UserData" }]
  },
  {
    collection: "chapters",
  }
);
const model = mongoose.model("ChapterData", Chapter);
module.exports = model;
