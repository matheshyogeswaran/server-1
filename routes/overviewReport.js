const express = require("express");
const overviewReport = express.Router();

const quizSubmissions = require("../models/quizSubmission.model");
const users = require("../models/user.model");
const Chapters = require("../models/chapter.model");

overviewReport.get("/overviewReport/:empId", async (req, res) => {
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
  let score = 0;
  let unitCount = 0;
  let overviewResult = [];
  let chapters = await Chapters.find();
  for (let chap of chapters) {
    score = 0;
    unitCount = 0;
    for (let quizSub of quizSubArr) {
      if (quizSub.chapterId.toString() === chap._id.toString()) {
        console.log(score);
        score += quizSub.score;
      }
      if (chap._id.toString() === quizSub.chapterId.toString()) {
        unitCount++;
      }
    }
    let result = {
      score,
      unitCount,
      chapterName: chap.chapterName,
      average: score / unitCount,
    };
    overviewResult.push(result);
  }

  res.json(overviewResult);
});

module.exports = overviewReport;
