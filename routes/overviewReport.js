const express = require("express");
const overviewReport = express.Router();

const quizSubmissions = require("../models/quizSubmission.model");
const users = require("../models/user.model");
const Chapters = require("../models/chapter.model");

overviewReport.get("/overviewReport/:empId", async (req, res) => {
  try {
    let reqEmpId = req.params.empId;
    let quizSubArr = [];
    let quizSubmissionsData = await quizSubmissions.find();
    for (quizSub of quizSubmissionsData) {
      // Retrieve the user object that matches the quiz submission user ID
      let user = await users.findOne({ _id: quizSub.userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Check if the retrieved user object has a matching employee ID
      if (user?.empId === reqEmpId) {
        let quizObj = {
          ...quizSub.toObject(),
          empId: user?.empId,
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
      // Loop through each quiz submission to check if it belongs to the current chapter
      for (let quizSub of quizSubArr) {
        // If the quiz submission belongs to the current chapter, add its score to the overall score for the chapter
        if (quizSub.chapterId.toString() === chap._id.toString()) {
          score += quizSub.score;
        }
        // If the quiz submission belongs to the current chapter, increment the unit count for the chapter
        if (chap._id.toString() === quizSub.chapterId.toString()) {
          unitCount++;
        }
      }
      let result = {
        score,
        unitCount,
        chapterName: chap.chapterName,
        average: unitCount === 0 ? 0 : score / unitCount,
      };
      overviewResult.push(result);
    }

    res.json(overviewResult);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = overviewReport;
