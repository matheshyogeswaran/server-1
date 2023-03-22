const express = require("express");
const submissionTable = express.Router();

const Users = require("../models/user.model");
const FinalProjectAssignments = require("../models/finalProjectAssignment.model");
submissionTable.get("/getSubmissionTable", async (req, res) => {
  let finalProjectAssignment = await FinalProjectAssignments.find();
  let finalProjData = [];

  for (let finalProjAssign of finalProjectAssignment) {
    let submittedUsers = await Users.find({ _id: finalProjAssign.userId });
    for (let subUser of submittedUsers) {
      let submiUser = {
        empId: subUser.empId,
        firstName: subUser.firstName,
        lastName: subUser.lastName,
        submittedYear: finalProjAssign.submittedDate.getFullYear(),
        submittedMonth:
          finalProjAssign.submittedDate.getMonth() < 10
            ? "0".concat(finalProjAssign.submittedDate.getMonth() + 1)
            : finalProjAssign.submittedDate.getMonth() + 1,
        submittedDate:
          finalProjAssign.submittedDate.getDate() < 10
            ? "0".concat(finalProjAssign.submittedDate.getDate())
            : finalProjAssign.submittedDate.getDate(),
        projectName: finalProjAssign.projectName,
        status: finalProjAssign.status,
      };
      finalProjData.push(submiUser);
    }
  }
  res.json(finalProjData);
});

module.exports = submissionTable;
