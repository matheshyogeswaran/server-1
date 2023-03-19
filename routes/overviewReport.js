const express = require("express");
const overviewReport = express.Router();

const quizSubmissions = require("../models/quizSubmission.model");
const users = require("../models/user.model");

overviewReport.post("/overviewReport/:empId", async (req, res) => {
  let reqEmpId = req.params.empId;
  let quizSubArr = [];
  let quizSubmissionsData = await quizSubmissions.find();
  for (quizSub of quizSubmissionsData) {
    let { empId } = await users.findOne({ _id: quizSub.userId });
    if (empId === reqEmpId) {
      let quizObj = {
        ...quizSub.toObject(),
        empId,
      };
      quizSubArr.push(quizObj);
    }
  }
  res.json(quizSubArr);
});

module.exports = overviewReport;
