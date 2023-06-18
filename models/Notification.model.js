const mongoose = require("mongoose");
const Notification = new mongoose.Schema(
  {
    for: { type: String },
    message: { type: String },
    time: { type: Date },
    type: { type: String},
    purpose: { type: String},
    extraData: {type: Object}
  },
  {
    collection: "notifications",
  }
);

const model = mongoose.model("NotificationData", Notification);
module.exports = model;