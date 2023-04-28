const mongoose = require("mongoose");
const date = new Date();
const ForbiddenAccess = new mongoose.Schema(
    {
        accessedURL: { type: String },
        accessedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },
        date: { type: String, default: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() },
        time: { type: String, default: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() },
        currentUserRole: { type: String }
    },
    { collection: "forbiddenAccess" }
);

const model = mongoose.model("ForbiddenAccess", ForbiddenAccess);
module.exports = model;