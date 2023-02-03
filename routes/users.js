const express = require("express");
const userRoutes = express.Router();
const User = require('../models/user.model');

userRoutes.route("/users").get(function (req, res) {
    res.json([
        { url: "http://localhost:1337/users/showAllUsers", method: "get", desc: "Shows all user's data from database" },
    ]);
});

userRoutes.route("/users/showAllUsers").get(function (req, res) {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        }
    });
});

module.exports = userRoutes;