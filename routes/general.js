const express = require("express");
const generalRoute = express.Router();
const User = require('../models/user.model');
const Department = require("../models/department.model");
const Jobtitle = require("../models/jobtitle.model");

generalRoute.route("/general/depisempty").get(async (req, res) => {
    try {
        const dep = await Department.find().lean();
        if (dep.length === 0) {
            res.status(200).json({ "status": true });
        } else {
            res.status(200).json({ "status": false });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = generalRoute;
