const express = require("express");
const downloadSubmission = express.Router();

let Users = require("../models/user.model");
let FinalProjectAssignments = require("../models/finalProjectAssignment.model");

downloadSubmission.get("/getZipFile/:empId", async (req, res) => {
  let empId = req.params.empId;
  let [user] = await Users.find({ empId: empId });
  let [projSub] = await FinalProjectAssignments.find({ userId: user._id });
  let fileName = projSub.submittedFile;
  let fileURL = "http://localhost:1337/files/" + fileName;

  res.json(fileURL);
});

module.exports = downloadSubmission;
