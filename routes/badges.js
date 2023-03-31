const express = require("express");
const leaderBoard = express.Router();

const Users = require("../models/user.model");
const QuizSubmissions = require("../models/quizSubmission.model");

leaderBoard.get("/getLeaderboardData/:currentUser", async (req, res) => {
  let quizSubmissions = await QuizSubmissions.find();
  let users = await Users.find();
  let leaderboardData = [];

  for (let user of users) {
    let totalScore = 0;
    let count = 0;
    for (let quizSub of quizSubmissions) {
      if (user._id.toString() === quizSub.userId.toString()) {
        totalScore += quizSub.score;
        count++;
      }
    }
    const averageScore = totalScore / count;
    let lbData = {
      empId: user.empId,
      firstName: user.firstName,
      lastName: user.lastName,
      totalScore,
      averageScore,
    };
    const userExist = await QuizSubmissions.find({ userId: user._id });
    if (userExist.length > 0) {
      leaderboardData.push(lbData);
    }
  }
  leaderboardData.sort((a, b) => b?.averageScore - a?.averageScore);

  let finalLeaderboardData = [];

  const { userRoleId } = await Users.findOne({
    empId: leaderboardData[0].empId,
  });

  finalLeaderboardData = [];
  for (let lbdata of leaderboardData) {
    for (let user of users) {
      if (lbdata.empId === user.empId) {
        if (user.userRoleId.toString() === userRoleId.toString()) {
          finalLeaderboardData.push(lbdata);
        }
      }
    }
  }

  //badge giving
  const currentUser = req.params.currentUser;
  const userEmpId = await Users.findOne({ _id: currentUser });
  let rank = finalLeaderboardData.findIndex(
    (data) => data.empId === userEmpId.empId
  );

  switch (rank) {
    case 0:
      userEmpId.badges.push({
        badgeValue: "Gold",
        earnedOn: Date.now(),
      });
      userEmpId.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Gold badge added successfully");
        }
      });
      break;
    case 1:
      userEmpId.badges.push({
        badgeValue: "Silver",
        earnedOn: Date.now(),
      });
      userEmpId.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Silver badge added successfully");
        }
      });
      break;
    case 2:
      userEmpId.badges.push({
        badgeValue: "Bronze",
        earnedOn: Date.now(),
      });
      userEmpId.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Bronze badge added successfully");
        }
      });
      break;
  }

  res.json(finalLeaderboardData);
});

leaderBoard.get("/showbadge/:currentUser", async (req, res) => {
  const currentuser = req.params.currentUser;
  const user = await Users.findOne({ _id: currentuser });
  user?.badges.forEach((badge, index) => {
    if (index === user?.badges.length - 1)
      switch (badge.badgeValue) {
        case "Gold":
          res.json(0);
          break;
        case "Silver":
          res.json(1);
          break;
        case "Bronze":
          res.json(2);
          break;
      }
  });
});

module.exports = leaderBoard;
