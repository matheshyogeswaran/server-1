const express = require("express");
const userRoutes = express.Router();
const User = require("../models/user.model");
const UserRole = require("../models/userRole.model");
userRoutes.use(require("../middleware/checkPermission"));

userRoutes.route("/users/showAllUsers").get(function(req, res) {
  User.find({})
    .populate({ path: "department", select: "depName createdBy" })
    .exec((err, users) => {
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

userRoutes.route("/users/isUserCollectionEmpty").get(async (req, res) => {
  try {
    const documents = await User.find().lean();
    const isEmpty = documents.length === 0;
    res.status(200).json({ status: isEmpty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = userRoutes;
