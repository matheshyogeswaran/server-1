const express = require("express");
const userRoutes = express.Router();
const User = require('../models/user.model');
const UserRole = require("../models/userRole.model")

userRoutes.route("/users/showAllUsers").get(function (req, res) {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route("/users/isUserAvailable").post(async (req, res) => {
    const email = req.body.email;
    // const count = await User.estimatedDocumentCount({});
    User.findOne({ emailAddress: email }, (err, users) => {
        if (err) {
            res.send(err);
        } else {
            if (users) {
                res.json({ status: true });
            } else {
                res.json({ status: false });

            }
        }
    });
});




module.exports = userRoutes;