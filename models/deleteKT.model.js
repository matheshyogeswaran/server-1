const mongoose = require("mongoose");

const deleteKT = new mongoose.Schema(
  {
    unitName: {
      type: String,
      required: true
    },
    sessionName: {
    type: String,
    required: true
  },
  sessionDesc: {
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
    collection: "deletekts",
  }
);

const model = mongoose.model("deleteKTData", deleteKT);
module.exports = model;