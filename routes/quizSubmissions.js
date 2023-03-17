const express = require("express");
const quizSubmission = express.Router();

const quizSubmissions = require("../models/quizSubmission.model");
const users = require("../models/user.model");

quizSubmission.get("/quizSubmission", async (req, res) => {
  let quizSubArr = [];
  let quizSubmissionsData = await quizSubmissions.find();
  for (quizSub of quizSubmissionsData) {
    let { empId } = await users.findOne({ _id: quizSub.userId });
    let quizObj = {
      ...quizSub.toObject(),
      empId,
    };
    quizSubArr.push(quizObj);
  }
  res.json(quizSubArr);
});

module.exports = quizSubmission;
