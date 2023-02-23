const express = require("express");
const userRoutes = express.Router();
const User = require('../models/user.model');

userRoutes.route("/users/showAllUsers").get(function (req, res) {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route("/users/isUserAvailable").post(function (req, res) {
    const email = req.body.email;
    User.findOne({emailAddress:email}, (err, users) => {
        if (err) {
                console.log(err)
                res.send(err);
        } else {
            if (users) {
                res.json({status:true});
                console.log(true)
            } else {
                res.json({status:false});
                console.log(false)

            }
        }
    });
});


module.exports = userRoutes;