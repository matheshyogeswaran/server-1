const express = require("express");
const user = express.Router();

const users = require("../models/user.model");
const userRoles = require("../models/userRole.model");
const departments = require("../models/department.model");

user.get("/users", async (req, res) => {
  let userWithUserRoles = [];
  let jobTitle;
  let department;
  let finalData = [];
  //add userRole into users collection
  let usersData = await users.find();
  for (let user of usersData) {
    let { userRoleValue } = await userRoles.findOne({ _id: user.userRoleId });
    let addUserRole = {
      ...user.toObject(),
      userRoleValue,
    };
    userWithUserRoles.push(addUserRole);
  }
  //add jobTitle into users collection
  for (let userUserRole of userWithUserRoles) {
    let deptCollection = await departments.findOne({
      _id: userUserRole.department,
    });
    for (let i = 0; i < deptCollection.jobTitles.length; i++) {
      jobTitle = deptCollection.jobTitles[i].jobTitle;
    }
    department = deptCollection.depName;

    let addJobTitle = {
      ...userUserRole,
      jobTitle,
      department,
    };
    finalData.push(addJobTitle);
  }
  res.json(finalData);
});

module.exports = user;
