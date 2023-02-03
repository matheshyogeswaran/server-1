const express = require("express");
const recordRoutes = express.Router();
const User = require('../models/user.model');


recordRoutes.route("/record").get(function (req, res) {
    return res.json({ message: "This is record route", active: true });
});

recordRoutes.route("/record/showUsers").get(function (req, res) {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        }
    });
});


module.exports = recordRoutes;