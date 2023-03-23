const express = require("express");
const userRoleRoute = express.Router();
const UserRole = require("../models/userRole.model");
const User = require("../models/user.model");

userRoleRoute.route("/userRoles/showAllUserRoles").get(function (req, res) {
  UserRole.find({}, {}, (err, userRoles) => {
    if (err) {
      res.send(err);
    } else {
      res.json(userRoles);
    }
  });
});

userRoleRoute.route("/userRoles/changeUserRole").post(function (req, res) {
  try {
    const userid = req.body.userID;
    const userRoleId = req.body.newRoleID;
    console.log(userid)
    console.log(userRoleId)
    User.updateOne(
      { _id: userid },
      { $set: { userRoleId: userRoleId } }
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


userRoleRoute.route("/userRoles/isUserRoleEmpty").get(async (req, res) => {
  try {
    const documents = await UserRole.find().lean();
    const isEmpty = documents.length === 0;
    res.status(200).json({ status: isEmpty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

userRoleRoute.route("/userRoles/initRoles/:id").get(async (req, res) => {
  const userID = req.params.id;
  const basicPermissions = [
    {
      userRoleValue: "Hired Employee",
      userRolePermissions: ["P001", "P002", "P003", "P009", "P010", "P011"]
    },
    {
      userRoleValue: "Content Creator",
      userRolePermissions: ["P001", "P009", "P010", "P013", "P018"]
    },
    {
      userRoleValue: "Supervisor",
      userRolePermissions: ["P001", "P004", "P008", "P009", "P010", "P012", "P014", "P015", "P016", "P017"]
    },
    {
      userRoleValue: "System Admin",
      userRolePermissions: ["P001", "P004", "P005", "P006", "P009", "P010", "P019", "P025"]
    },
    {
      userRoleValue: "Super Admin",
      userRolePermissions: ["P001", "P002", "P003", "P004", "P005", "P006", "P007", "P009", "P010", "P020", "P021", "P022", "P023", "P024"]
    },
  ];

  try {
    const documents = await UserRole.find().lean();
    const isEmpty = documents.length === 0;
    if (isEmpty) {
      //insert basic user role permissions if no value in userroles collection
      const result = await UserRole.insertMany(basicPermissions);
      const superAdminDoc = result[4];
      User.updateOne(
        { _id: userID },
        { $set: { userRoleId: superAdminDoc._id, verified: true } }
      ).then((result) => {
        return res.json({ "message": "Basic User Roles initialized successfully. You will be LoggedOut. Please Login Again.", "status": true, "data": result });
      }).catch((err) => {
        return res.json({
          message: "Error in Updating User's Role",
          status: false,
        });
      });
    } else {
      return res.json({ "message": "User Roles already available", "status": false });
    }
  } catch (error) {
    console.error(error);
    return res.json({ "message": "Server Error", "status": false });
  }
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

userRoleRoute
  .route("/userRoles/showUsersUnderUserRole/:id")
  .get(async (req, res) => {
    try {
      const userrole = await UserRole.findById(req.params.id);
      if (!userrole) {
        return res.status(404).send("User role not found");
      }
      const users = await User.find({ userRole: userrole._id }).populate(
        "userRole"
      );
      res.send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

userRoleRoute.route("/userRoles/addUserRole").post(async (req, res) => {
  const userRoleValue = req.body.userRoleName;
  const userRolePermissions = req.body.permissions;
  const newUserRoleData = new UserRole({
    userRoleValue,
    userRolePermissions,
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
      {
        $set: {
          userRoleValue: userRoleValue,
          userRolePermissions: userRolePermissions,
        },
      }
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
