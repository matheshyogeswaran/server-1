const express = require("express");
const recordRoutes = express.Router();

recordRoutes.route("/record").get(function (req, res) {
    return res.json({ message: "This is record route", active: true });
});

module.exports = recordRoutes;