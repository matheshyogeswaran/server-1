const express = require("express");
const chapterReport = express.Router();

const quizSubmissions = require("../models/quizSubmission.model");
const users = require("../models/user.model");
const Chapters = require("../models/chapter.model");
const Units = require("../models/unit.model");

chapterReport.get("/chapterReport/:empId", async (req, res) => {
  try {
    let reqEmpId = req.params.empId;
    let quizSubArr = [];
    // Retrieve user associated with the quiz submission
    let quizSubmissionsData = await quizSubmissions.find();
    for (quizSub of quizSubmissionsData) {
      let user = await users.findOne({ _id: quizSub.userId });
      // If user's empId matches requested empId, add quiz submission to quizSubArr
      if (user?.empId === reqEmpId) {
        let quizObj = {
          ...quizSub.toObject(),
          empId: user?.empId,
        };
        quizSubArr.push(quizObj);
      }
    }
    let chapterResults = [];
    let chapters = await Chapters.find();
    for (let chap of chapters) {
      let chapterUnit = {};
      let unit = [];
      for (let quizSub of quizSubArr) {
        if (chap._id.toString() === quizSub.chapterId.toString()) {
          let units = await Units.find({ _id: quizSub.unitId });
          for (let unit of units) {
            // Check if the quiz submission is associated with the current chapter
            if (quizSub.unitId.toString() === unit._id.toString()) {
              chapterUnit = {
                unitName: unit.unitName,
                score: quizSub.score,
              };
            }
          }
          // Add chapterUnit to unit array
          unit.push(chapterUnit);
        }
      }
      // If unit array is not empty, add chapter name and unit array to chapterResults
      if (unit.length > 0)
        chapterResults.push({ chapterName: chap.chapterName, units: unit });
    }

    res.json(chapterResults);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = chapterReport;
