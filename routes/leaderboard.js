const express = require("express");
const leaderBoard = express.Router();

const Users = require("../models/user.model");
const QuizSubmissions = require("../models/quizSubmission.model");

leaderBoard.get("/getLeaderboardData", async (req, res) => {
  let quizSubmissions = await QuizSubmissions.find();
  let users = await Users.find();
  let totalScore = 0;
  let leaderboardData = [];

  for (let user of users) {
    totalScore = 0;
    for (let quizSub of quizSubmissions) {
      if (user._id.toString() === quizSub.userId.toString()) {
        totalScore += quizSub.score;
      }
    }
    let lbData = {
      empId: user.empId,
      firstName: user.firstName,
      lastName: user.lastName,
      totalScore,
    };
    leaderboardData.push(lbData);
  }
  leaderboardData.sort((a, b) => b.totalScore - a.totalScore);

  let hiredEmployee = leaderboardData[0].empId;

  for (let user of users) {
    if (user.empId === hiredEmployee) {
      hiredEmployee = user.userRoleId;
    }
  }
  let finalLeaderboardData = [];
  for (let lbdata of leaderboardData) {
    for (let user of users) {
      if (lbdata.empId === user.empId) {
        if (user.userRoleId.toString() === hiredEmployee.toString()) {
          finalLeaderboardData.push(lbdata);
        }
      }
    }
  }

  res.json(finalLeaderboardData);
});

module.exports = leaderBoard;
