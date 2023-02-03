const express = require("express");
const authenticationRoutes = express.Router();
const User = require('../models/user.model');

authenticationRoutes.route("/authentication/addFurtherDetails").post(async (req, res) => {
    console.log(req.body);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const phoneNumber = req.body.phone;
    const emailAddress = req.body.email;
    const department = req.body.department;
    const jobPosition = req.body.jobTitle;

    const user = new User({
        firstName,
        lastName,
        gender,
        dob,
        phoneNumber,
        emailAddress,
        department,
        jobPosition
    })

    user.save()
        .then(item => res.json({ message: "Further Details Added Successfully", status: "success" }))
        .catch(err => {
            if (err.code === 11000) {
                return res.json({ message: 'User already exists', status: "duplicate"});
            }
            res.status(500).send({ error: 'Error saving data to the database' });
        });

    // try {
    //     await user.save();
    //     res.status(200).json({ message: "Further Details Added Successfully", status: true })
    //     console.log("User added successfully");
    // } catch (error) {
    //     res.status(400).send({ message: error })
    //     console.log(error);
    // }
});

module.exports = authenticationRoutes;