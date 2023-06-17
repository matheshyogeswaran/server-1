const express = require("express");
const leaderBoard = express.Router();

const Users = require("../models/user.model");
const QuizSubmissions = require("../models/quizSubmission.model");
const Departments = require("../models/department.model");
const Chapters = require("../models/chapter.model");

leaderBoard.get("/getCurrentUserLeaderboardData", async (req, res) => {
  try {
    // Get the current user ID from the request parameters
    const currentUserDep = req.query.currentUserDep;
    const currentUser = req.query.currentUser;

    // // Retrieve all quiz submissions and users from the database
    let leaderboard = [];
    // get users from specific department
    const usersData = await Users.find({ department: currentUserDep });
    for (const user of usersData) {
      let totalScore = 0;
      let count = 0;
      // get chapters from specific department
      const chaptersData = await Chapters.find({ depID: currentUserDep });
      for (const chapters of chaptersData) {
        for (const units of chapters?.unitsOffer) {
          // get submissions from specific unit and user
          const quizSubmissionsData = await QuizSubmissions.find({
            unitId: units,
            userId: user?._id,
          });
          for (const quizSubmissions of quizSubmissionsData) {
            totalScore += quizSubmissions?.score;
            count++;
          }
        }
      }

      let averageScore = totalScore / count;
      if (!isNaN(averageScore)) {
        let lbData = {
          empId: user?.empId,
          firstName: user?.firstName,
          lastName: user?.lastName,
          userImage: user?.userImage,
          totalScore,
          averageScore,
          rank: 0,
        };
        leaderboard.push(lbData);
        leaderboard.sort((a, b) => b?.averageScore - a?.averageScore);
      }
    }
    let rank = 1;
    for (let i = 0; i < leaderboard.length; i++) {
      if (
        i > 0 && //always first index of leaderboard person should be rank 1
        leaderboard[i].averageScore !== leaderboard[i - 1].averageScore
      ) {
        rank = i + 1;
      }
      leaderboard[i].rank = rank;
    }

    let currentUserAvgScore = 0;
    let currentUserRank = 0;
    const { empId } = await Users.findOne({ _id: currentUser });
    leaderboard.findIndex(
      (emp) =>
        emp?.empId === empId &&
        ((currentUserAvgScore = emp?.averageScore),
        (currentUserRank = emp?.rank))
    );
    const finalData = {
      lbData: leaderboard,
      currentUserAvgScore,
      currentUserRank,
    };
    res.json(finalData);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

leaderBoard.get("/getLeaderboardData", async (req, res) => {
  try {
    // Retrieve all quiz submissions and users from the database
    let leaderboardData = [];
    const departmentsData = await Departments.find();

    for (const department of departmentsData) {
      let leaderboard = [];
      // get users from specific department
      const usersData = await Users.find({ department: department?._id });
      for (const user of usersData) {
        let totalScore = 0;
        let count = 0;
        // get chapters from specific department
        const chaptersData = await Chapters.find({ depID: department._id });
        for (const chapters of chaptersData) {
          for (const units of chapters?.unitsOffer) {
            // get submissions from specific unit and user
            const quizSubmissionsData = await QuizSubmissions.find({
              unitId: units,
              userId: user?._id,
            });
            for (const quizSubmissions of quizSubmissionsData) {
              totalScore += quizSubmissions?.score;
              count++;
            }
          }
        }

        let averageScore = totalScore / count;
        if (!isNaN(averageScore)) {
          let lbData = {
            empId: user?.empId,
            firstName: user?.firstName,
            lastName: user?.lastName,
            userImage: user?.userImage,
            totalScore,
            averageScore,
            rank: 0,
          };
          leaderboard.push(lbData);
          leaderboard.sort((a, b) => b.averageScore - a.averageScore);
        }
      }
      let rank = 1;
      for (let i = 0; i < leaderboard.length; i++) {
        if (
          i > 0 && //always first index of leaderboard person should be rank 1
          leaderboard[i].averageScore !== leaderboard[i - 1].averageScore
        ) {
          rank = i + 1;
        }
        leaderboard[i].rank = rank;
      }

      leaderboardData.push({
        department: department?.depName,
        leaderboard,
      });
    }
    res.json(leaderboardData);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = leaderBoard;
