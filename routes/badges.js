const express = require("express");
const badges = express.Router();

const Users = require("../models/user.model");
const QuizSubmissions = require("../models/quizSubmission.model");

badges.post("/storeBadge", async (req, res) => {
  try {
    // calculating the rank of the user
    let quizSubmissions = await QuizSubmissions.find();
    let users = await Users.find();
    let leaderboardData = [];

    // calcluating total score and num of quiz submissions
    for (let user of users) {
      let totalScore = 0;
      let count = 0;
      for (let quizSub of quizSubmissions) {
        if (user._id.toString() === quizSub.userId.toString()) {
          totalScore += quizSub.score;
          count++;
        }
      }
      //calcluating average score
      const averageScore = totalScore / count;
      //storing empId and average score
      let lbData = {
        empId: user.empId,
        averageScore,
      };
      // if quiz is submitted by current user push his average score in an array
      const userExist = await QuizSubmissions.find({ userId: user?._id });
      if (userExist?.length > 0) {
        leaderboardData.push(lbData);
      }
    }
    //sorting the array to get the rank
    leaderboardData.sort((a, b) => b?.averageScore - a?.averageScore);

    let finalLeaderboardData = [];

    //get the first rank user
    const userUserRole = await Users.findOne({
      empId: leaderboardData?.[0]?.empId,
    });

    finalLeaderboardData = [];
    for (let lbdata of leaderboardData) {
      for (let user of users) {
        if (lbdata?.empId === user?.empId) {
          // if user role is hiredEmployee
          if (
            user.userRoleId.toString() === userUserRole?.userRoleId.toString()
          ) {
            finalLeaderboardData.push(lbdata);
          }
        }
      }
    }

    //badge giving
    const currentUser = req.body?.currentUser;
    const unitId = req.body?.unitId;
    const userEmpId = await Users.findOne({ _id: currentUser });
    // if user is not found,throw an error
    if (!userEmpId) {
      throw new Error("User not found");
    }
    const [quizSubmission] = await QuizSubmissions.find({
      userId: currentUser,
      unitId: unitId,
    });
    if (!quizSubmission) {
      throw new Error("Unit not found");
    }
    //find the index of the user
    let rank = finalLeaderboardData.findIndex(
      (data) => data?.empId === userEmpId?.empId
    );

    if (rank === -1) {
      throw new Error("User is not in the leaderboard");
    }

    if (quizSubmission?.badgeGiven === false) {
      // if rank is less than 4
      switch (rank) {
        case 0:
          //update badgeGiven field in the quizSubmission collection
          await QuizSubmissions.updateOne(
            { userId: currentUser, unitId: unitId },
            { badgeGiven: true },
            { new: true }
          );
          //update badges array field in the user collection
          userEmpId?.badges?.push({
            badgeValue: "Gold",
            earnedOn: Date.now(),
          });
          userEmpId?.save((err) => {
            if (err) {
              throw err;
            } else {
              res.status(200).send("Gold badge added successfully");
            }
          });
          break;
        case 1:
          userEmpId?.badges.push({
            badgeValue: "Silver",
            earnedOn: Date.now(),
          });
          userEmpId?.save((err) => {
            if (err) {
              throw err;
            } else {
              res.status(200).send("Silver badge added successfully");
            }
          });
          break;
        case 2:
          userEmpId?.badges?.push({
            badgeValue: "Bronze",
            earnedOn: Date.now(),
          });
          userEmpId?.save((err) => {
            if (err) {
              throw err;
            } else {
              res.status(200).send("Bronze badge added successfully");
            }
          });
          break;
        default:
          res.json("Badge is not applicable for this user");
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

badges.get("/showbadge/:currentUser", async (req, res) => {
  try {
    const currentuser = req.params.currentUser;
    const user = await Users.findOne({ empId: currentuser });

    // if user is not found
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    // storing all badges he got upto now
    let badgeArr = [];
    user?.badges.forEach((badge) => {
      switch (badge.badgeValue) {
        case "Gold":
          badgeArr.push(0);
          break;
        case "Silver":
          badgeArr.push(1);
          break;
        case "Bronze":
          badgeArr.push(2);
          break;
      }
    });

    let badgecount = {};
    if (badgeArr.length > 0) {
      let gold = 0;
      let silver = 0;
      let bronze = 0;
      for (let countbadge of badgeArr) {
        if (countbadge === 0) {
          gold++;
        } else if (countbadge === 1) {
          silver++;
        } else if (countbadge === 2) {
          bronze++;
        }
      }
      badgecount = {
        gold,
        silver,
        bronze,
      };
    }
    res.json(badgecount);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = badges;
