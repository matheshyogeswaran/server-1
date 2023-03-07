const express = require("express");
const authenticationRoutes = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode");
require("dotenv").config();
const User = require('../models/user.model');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        return { payload: ticket.getPayload() };
    } catch (error) {
        return { error: "Invalid user detected. Please try again" };
    }
}

authenticationRoutes.route("/authentication/login").post(async (req, res) => {
    try {
        if (req.body.credential) {
            const verificationResponse = await verifyGoogleToken(req.body.credential);
            if (verificationResponse.error) {
                return res.status(400).json({ message: verificationResponse.error }); // this is only for testing purpose
                // return res.status(400).json({ message: "Login failed" }); // This is the original code
            }
            const profile = verificationResponse?.payload;

            const userDocument = await User.findOne({ emailAddress: profile?.email });
            if (userDocument) {
                res.status(200).json({
                    message: "Login was successfull",
                    user: {
                        firstName: profile?.given_name,
                        lastName: profile?.family_name,
                        picture: profile?.picture,
                        email: profile?.email,
                        userID: userDocument._id,
                        userRole: userDocument.userRole,
                        token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
                            expiresIn: "1h",
                        }),
                    },
                });
            } else {
                res.status(200).json({
                    message: "Login was successfull",
                    user: {
                        firstName: profile?.given_name,
                        lastName: profile?.family_name,
                        picture: profile?.picture,
                        email: profile?.email,
                    },
                });
            }

        }
    } catch (error) {
        res.status(500).json({
            message: error?.message || error,
        });
    }
});



authenticationRoutes.route("/authentication/addFurtherDetails").post(async (req, res) => {
    // console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const phoneNumber = req.body.phone;
    const emailAddress = req.body.email;
    const department = req.body.department;
    const jobPosition = req.body.jobTitle;

    const user = new User({ firstName, lastName, gender, dob, phoneNumber, emailAddress, department, jobPosition })
    user.save()
        .then(item => res.json({ message: "Further Details Added Successfully", status: "success" }))
        .catch(err => {
            if (err.code === 11000) {
                return res.json({ message: 'User already exists', status: "duplicate" });
            }
            res.status(500).send({ error: 'Error saving data to the database' });
        });
});


authenticationRoutes.route("/authentication/verifyToken").post(async (req, res) => {
    const token = req.body.token;
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.json(
                {
                    message: "Token is Invalid or Expired",
                    status: false,
                    expTime: "1h"
                }
            );
        } else {
            return res.json(
                {
                    message: decoded,
                    status: true,
                    expTime: "1h"
                }
            );
        }
    });
});

module.exports = authenticationRoutes;