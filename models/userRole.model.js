const mongoose = require("mongoose");
const UserRole = new mongoose.Schema(
  {
    userRoleValue: { type: String, required: true },
    userRolePermissions: [{ type: String, required: true }],
    availableUsers: [{ type: mongoose.Types.ObjectId, ref: "UserData" }],
  },
  {
    collection: "userroles",
  }
);
const model = mongoose.model("UserRoleData", UserRole);
module.exports = model;
