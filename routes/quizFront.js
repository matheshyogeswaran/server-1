const express = require("express");
const quizFront = express.Router();

const Chapters = require("../models/chapter.model");
const Units = require("../models/unit.model");
const QuizSubmissions = require("../models/quizSubmission.model");

quizFront.get("/quizFront", async (req, res) => {
  // Retrieve all the data needed from the database
  const chaptersData = await Chapters.find();
  const unitsData = await Units.find();
  const quizSubmissionData = await QuizSubmissions.find();

  const chapters = [];
  for (const chapter of chaptersData) {
    const units = [];

    // Only process this chapter if it has at least one unit
    if (chapter.unitsOffer.length > 0) {
      for (const unitId of chapter.unitsOffer) {
        // Find the unit object that matches the unit ID
        const unit = unitsData.find(
          (unit) => unit._id.toString() === unitId.toString()
        );
        let count = 0;

        // Count the number of quiz submissions for this unit
        for (const submission of quizSubmissionData) {
          if (submission.unitId.toString() === unit._id.toString()) {
            count++;
          }
        }

        // Create an object with the unit name and the count of quiz submissions and add it to the units array if there are submissions
        if (count > 0) {
          units.push({
            unitId: unit._id,
            unitName: unit.unitName,
            count,
          });
        }
      }

      // Create an object with the chapter name and the units data and add it to the chapters array
      chapters.push({
        chapterName: chapter.chapterName,
        units,
      });
    }
  }

  res.json(chapters);
});

module.exports = quizFront;
