const express = require("express");
const KtSession = express.Router();

const KtSessions = require("../models/ktSession.model");
const Users = require("../models/user.model");

KtSession.post("/ktsessionRatings/:empId", async (req, res) => {
  let reqEmpId = req.params.empId;
  let [{ _id }] = await Users.find({ empId: reqEmpId }).select({ _id: 1 });
  let ktSessionRatings = await KtSessions.find({ createdBy: _id });
  let overAllRating = 0;
  let overAllQuality = 0;
  let overAllComm = 0;
  let overAllClarity = 0;
  let overAllKnowledgeAndSkill = 0;

  //data to progress bar
  let overAllRatingData = [];
  let overAllQualityData = [];
  let overAllCommData = [];
  let overAllClarityData = [];
  let overAllKnowledgeAndSkillData = [];

  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;
  let count5 = 0;

  for (let ratings of ktSessionRatings) {
    //data to progress bar
    overAllRatingData.push(ratings.overallRating);
    overAllQualityData.push(ratings.overallQuality);
    overAllCommData.push(ratings.overallComm);
    overAllClarityData.push(ratings.overallClarity);
    overAllKnowledgeAndSkillData.push(ratings.overallKnowledgeAndSkill);

    //storing overAllRating
    overAllRating += ratings.overallRating;
    overAllQuality += ratings.overallQuality;
    overAllComm += ratings.overallComm;
    overAllClarity += ratings.overallClarity;
    overAllKnowledgeAndSkill += ratings.overallKnowledgeAndSkill;
  }
  //progressbar data calculation
  overAllRatingData.map((data) =>
    data === 1
      ? count1++
      : data === 2
      ? count2++
      : data === 3
      ? count3++
      : data === 4
      ? count4++
      : count5++
  );
  let totalCount = count1 + count2 + count3 + count4 + count5;
  overAllRatingData = [
    (count1 / totalCount) * 100,
    (count2 / totalCount) * 100,
    (count3 / totalCount) * 100,
    (count4 / totalCount) * 100,
    (count5 / totalCount) * 100,
  ];

  //rating
  let finalOverAllRating = (overAllRating / ktSessionRatings.length).toFixed(1);
  let finalOverAllQuality = (overAllQuality / ktSessionRatings.length).toFixed(
    1
  );
  let finalOverAllComm = (overAllComm / ktSessionRatings.length).toFixed(1);
  let finalOverAllClarity = (overAllClarity / ktSessionRatings.length).toFixed(
    1
  );
  let finalOverAllKnowledgeAndSkill = (
    overAllKnowledgeAndSkill / ktSessionRatings.length
  ).toFixed(1);

  let ktSessionRatingsData = {
    finalOverAllRating,
    finalOverAllQuality,
    finalOverAllComm,
    finalOverAllClarity,
    finalOverAllKnowledgeAndSkill,
    numOfKtSessions: ktSessionRatings.length,
    overAllRatingData,
  };
  res.json(ktSessionRatingsData);
});

module.exports = KtSession;
