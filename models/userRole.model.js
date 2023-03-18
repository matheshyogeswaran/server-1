const mongoose = require("mongoose");
const UserRole = new mongoose.Schema(
  {
    userRoleValue: { type: String, required: true },
    userRolePermissions: [{ type: String, required: true }],
    availableUsers: [{ type: mongoose.Types.ObjectId, ref: "UserData" }],
  },
  {
    collection: "userRoles",
  }
);
const model = mongoose.model("userRole", UserRole);
module.exports = model;
