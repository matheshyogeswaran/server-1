const mongoose = require("mongoose");

const UserRole = new mongoose.Schema(
  {
    userRoleValue: { type: String },
  },
  {
    collection: "userRoles",
  }
);

const model = mongoose.model("UserRoleData", UserRole);
module.exports = model;
