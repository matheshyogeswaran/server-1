const express = require("express");
const userRoleRoute = express.Router();
const User = require("../models/user.model");

userRoleRoute.route("/userRoles/changeUserRole").post(function (req, res) {
  try {
    const userid = req.body.userID;
    const userRole = req.body.newRole;
    User.updateOne(
      { _id: userid },
      { $set: { userRole: userRole, verified: true }, $push: { notifications: { message: "Your user role is changed to " + userRole + ". From next login, It will take effect." } } }
    )
      .then((result) => {
        console.log(result)
        return res.json({
          message: "User Role Changed Successfully",
          status: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          message: "Error in Changing the User Role",
          status: false,
        });
      });
  } catch {
    return res.json({
      message: "User Not Found. Try Again !!!",
      status: false,
    });
  }
});


userRoleRoute.route("/userRoles/groupbyuserrole").get(async (req, res) => {
  User.aggregate([
    {
      $group: {
        _id: '$userRole',
        count: { $sum: 1 },
      }
    }
  ], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(result);
    }
  });
});

module.exports = userRoleRoute;