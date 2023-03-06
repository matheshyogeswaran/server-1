const express = require("express");
const userRoleRoute = express.Router();
const UserRole = require("../models/userRole.model")
const User = require('../models/user.model');

userRoleRoute.route("/userRoles/showAllUserRoles").get(function (req, res) {
    UserRole.find({}, {}, (err, userRoles) => {
        if (err) {
            res.send(err);
        } else {
            res.json(userRoles);
        }
    });
});


userRoleRoute.route("/userRoles/findOneUserRole/:id").get(function (req, res) {
    const userRoleID = req.params.id;
    UserRole.findOne({ _id: userRoleID }, (err, userRole) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            return res.json(userRole);
        }
    });
});

userRoleRoute.route("/userRoles/showUsersUnderUserRole/:id").get(async (req, res) => {
    try {
        const userrole = await UserRole.findById(req.params.id );
        if (!userrole) {
            return res.status(404).send('User role not found');
        }
        const users = await User.find({ userRole: userrole._id }).populate('userRole');
        res.send(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

userRoleRoute.route("/userRoles/addUserRole").post(async (req, res) => {
    const userRoleValue = req.body.userRoleName;
    const userRolePermissions = req.body.permissions
    const newUserRoleData = new UserRole({
        userRoleValue,
        userRolePermissions
    });
    newUserRoleData
        .save()
        .then((item) =>
            res.json({
                message: "User Role " + userRoleValue + " Created Successfully",
                status: "success",
            })
        )
        .catch((err) => {
            if (err.code === 11000) {
                return res.json({
                    message: "User Role already exists",
                    status: "duplicate",
                });
            }
            res.status(500).send({ error: err });
        });
});


userRoleRoute.route("/userRoles/editUserRole").post(async (req, res) => {
    const _id = req.body.userRoleID;
    const userRoleValue = req.body.userRoleName;
    const userRolePermissions = req.body.permissions;
    try {
        UserRole.updateOne(
            { _id: _id },
            { $set: { userRoleValue: userRoleValue, userRolePermissions: userRolePermissions } }
        )
            .then((result) => {
                return res.json({
                    message: "User Role Updated Successfully",
                    status: "success",
                });
            })
            .catch((err) => {
                return res.json({
                    message: "Error in Updating User Role",
                    status: false,
                });
            });
    } catch {
        return res.json({
            message: "User Role Not Found. Try Again !!!",
            status: false,
        });
    }
});

module.exports = userRoleRoute;