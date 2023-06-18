const mongoose = require("mongoose");

const deleteUnit = new mongoose.Schema(
  {
    chapterName: { 
      type: String, 
      required: true 
    },
    unitName: {
    type: String,
    required: true
  },
  unitDesc: {
    type: String,
    required: true
  },
  createdBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
  updated_at: {
    type: String,
     
  },
},
  {
    collection: "deleteunits",
  }
);

const model = mongoose.model("deleteUnitData", deleteUnit);
module.exports = model;