const express = require("express");
const chapterReport = express.Router();

const quizSubmissions = require("../models/quizSubmission.model");
const users = require("../models/user.model");
const Chapters = require("../models/chapter.model");
const Units = require("../models/unit.model");

chapterReport.get("/chapterReport/:empId", async (req, res) => {
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
  let unit = [];
  let chapterResults = [];
  let chapterUnit = {};
  let chapters = await Chapters.find();
  for (let chap of chapters) {
    unit = [];
    for (let quizSub of quizSubArr) {
      if (chap._id.toString() === quizSub.chapterId.toString()) {
        let units = await Units.find({ _id: quizSub.unitId });
        for (let unit of units) {
          if (quizSub.unitId.toString() === unit._id.toString()) {
            chapterUnit = {
              unitName: unit.unitName,
              score: quizSub.score,
            };
          }
        }
        unit.push(chapterUnit);
      }
    }
    if (unit.length > 0)
      chapterResults.push({ chapterName: chap.chapterName, units: unit });
  }

  res.json(chapterResults);
});

module.exports = chapterReport;
