const express = require("express");
const authenticationRoutes = express.Router();
const User = require('../models/user.model');
const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client("707797281139-4aqd3htq7bnut6nsp76ufc448svl64r9.apps.googleusercontent.com");
const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode");

const GOOGLE_CLIENT_ID = "707797281139-4aqd3htq7bnut6nsp76ufc448svl64r9.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
// let DB = [];

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

            res.status(201).json({
                message: "Login was successfull",
                // userAvailability:status,
                user: {
                    firstName: profile?.given_name,
                    lastName: profile?.family_name,
                    picture: profile?.picture,
                    email: profile?.email,
                    token: jwt.sign({ email: profile?.email }, "This is my new secret", {
                        expiresIn: "1h",
                    }),
                },
            });
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

authenticationRoutes.route("/authentication/checkTokenValidity").post(async (req, res) => {
    // console.log(req.body.authorization)
    const token = req.body.authorization;
    if (!token) {
        return res.send({ message: 'No token provided.', status: false });
    }
    try {
        const decoded = jwt.verify(token, "This is my new secret");
        console.log(decoded);
        if (decoded.exp <= Date.now() / 1000) {
            return res.send({ message: 'Token has expired.', status: false });
        }
        return res.send({ message: 'Token is valid.', status: true });
        // req.userId = decoded.id;
    } catch (err) {
        console.log(err);
        return res.send({ message: 'Token Expired.', status: false });
    }

});


module.exports = authenticationRoutes;