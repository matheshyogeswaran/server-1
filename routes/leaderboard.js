const express = require("express");
const leaderBoard = express.Router();

const Users = require("../models/user.model");
const QuizSubmissions = require("../models/quizSubmission.model");

leaderBoard.get("/getLeaderboardData/:currentUser", async (req, res) => {
  try {
    // Get the current user ID from the request parameters
    const currentUser = req.params.currentUser;

    // Retrieve all quiz submissions and users from the database
    let quizSubmissions = await QuizSubmissions.find();
    let users = await Users.find();
    let leaderboardData = [];

    for (let user of users) {
      let totalScore = 0;
      let count = 0;
      for (let quizSub of quizSubmissions) {
        // If the quiz submission belongs to the current user, add its score to the total score
        if (user?._id.toString() === quizSub?.userId.toString()) {
          totalScore += quizSub?.score;
          count++;
        }
      }
      // Calculate the average score for the user
      let averageScore = totalScore / count;
      let lbData = {
        empId: user?.empId,
        firstName: user?.firstName,
        lastName: user?.lastName,
        userImage: user?.userImage,
        totalScore,
        averageScore,
      };

      // Check if the user has any quiz submissions, and add their data to the leaderboard array
      const userExist = await QuizSubmissions.find({ userId: user?._id });
      if (userExist.length > 0) {
        leaderboardData.push(lbData);
      }
    }
    // Sort the leaderboard data array by average score in descending order
    leaderboardData.sort((a, b) => b.averageScore - a.averageScore);

    let finalLeaderboardData = [];

    // Get the user role ID of the top-scoring employee (assumed to be the first employee with a score > 0)
    const userRole = await Users.findOne({
      empId: leaderboardData[0]?.empId,
    });

    let currentUserScore = 0;
    finalLeaderboardData = [];
    for (let lbdata of leaderboardData) {
      for (let user of users) {
        if (lbdata.empId === user?.empId) {
          if (user?.userRoleId.toString() === userRole?.userRoleId.toString()) {
            // If the user is the current user, update their current score
            if (user?._id.toString() === currentUser) {
              currentUserScore = lbdata?.averageScore;
            }
            finalLeaderboardData.push(lbdata);
          }
        }
      }
    }

    // Get the rank of the current user in the leaderboard
    const rank = finalLeaderboardData.findIndex(
      (obj) => obj.averageScore === currentUserScore
    );

    const finalData = {
      lbData: finalLeaderboardData,
      currentUserScore,
      rank,
    };
    res.json(finalData);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

leaderBoard.get("/getLeaderboardData", async (req, res) => {
  try {
    // Retrieve all quiz submissions and users from the database
    let quizSubmissions = await QuizSubmissions.find();
    let users = await Users.find();
    let leaderboardData = [];

    for (let user of users) {
      let totalScore = 0;
      let count = 0;
      for (let quizSub of quizSubmissions) {
        // If the quiz submission belongs to the current user, add its score to the total score
        if (user?._id.toString() === quizSub?.userId.toString()) {
          totalScore += quizSub?.score;
          count++;
        }
      }
      let averageScore = totalScore / count;
      let lbData = {
        empId: user?.empId,
        firstName: user?.firstName,
        lastName: user?.lastName,
        userImage: user?.userImage,
        totalScore,
        averageScore,
      };

      // Check if the user has any quiz submissions, and add their data to the leaderboard array
      const userExist = await QuizSubmissions.find({ userId: user?._id });
      if (userExist?.length > 0) {
        leaderboardData.push(lbData);
      }
    }
    leaderboardData.sort((a, b) => b.averageScore - a.averageScore);

    let finalLeaderboardData = [];

    //get the top scored employee userRole Id
    if (leaderboardData?.[0]?.totalScore > 0) {
      let hiredEmployee = leaderboardData[0]?.empId;

      for (let user of users) {
        if (user?.empId === hiredEmployee) {
          hiredEmployee = user?.userRoleId;
        }
      }
      finalLeaderboardData = [];
      // if user is hiredEmployee add the data to the array
      for (let lbdata of leaderboardData) {
        for (let user of users) {
          if (lbdata.empId === user?.empId) {
            if (user?.userRoleId.toString() === hiredEmployee.toString()) {
              finalLeaderboardData.push(lbdata);
            }
          }
        }
      }
    }

    res.json(finalLeaderboardData);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = leaderBoard;
