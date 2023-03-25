const express = require("express");
const scoreEditLog = express.Router();

const Users = require("../models/user.model");
const ScoreEditLog = require("../models/scoreEditLog.model");

//should include supervisor ID
scoreEditLog.post("/storeScore", async (req, res) => {
  const { empId, score, projectName } = req.body;

  // const upgradedBy = req.body.userID;
  const upgradedOn = Date.now();

  const [user] = await Users.find({ empId: empId });

  const scoreEditLog = new ScoreEditLog({
    projectName,
    submittedBy: user._id,
    score: [],
    upgradedOn: [],
  });

  scoreEditLog.score.push(score);
  scoreEditLog.upgradedOn.push(upgradedOn);

  scoreEditLog
    .save()
    .then(() => res.json("score added successfully"))
    .catch((err) => {
      res.status(500).send(err);
    });
});

const ScoreEditLogs = require("../models/scoreEditLog.model");

scoreEditLog.post("/updateScore", async (req, res) => {
  const { empId, score, projectName } = req.body;
  const upgradedOn = Date.now();

  let user = await Users.findOne({ empId });

  let scoreEditLog = await ScoreEditLog.findOne({ submittedBy: user._id });

  if (!scoreEditLog) {
    // If no score log exists for the user, create a new one
    scoreEditLog = new ScoreEditLog({
      projectName,
      submittedBy: user._id,
      score: [],
      upgradedOn,
    });
  } else {
    // If a score log already exists, update it
    scoreEditLog.projectName = projectName;
    scoreEditLog.score.push(score);
    scoreEditLog.upgradedOn.push(upgradedOn);
  }

  scoreEditLog
    .save()
    .then(() => res.json("successfully upgraded"))
    .catch((err) => {
      res.status(500).send(err);
    });
});

scoreEditLog.get("/getScoreEditLog", async (req, res) => {
  let editlogResult = {};
  let editlogArr = [];

  const editLog = await ScoreEditLog.find();
  for (let editlog of editLog) {
    editlogResult = {};
    const [user] = await Users.find({ _id: editlog.submittedBy });
    const name = user.firstName + " " + user.lastName;
    let dateArr = [];
    for (let time of editlog.upgradedOn) {
      let date = time;
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let date1 = date.getDate();
      let time1 = year + "-" + month + "-" + date1;
      dateArr.push(time1);
    }
    editlogResult = {
      projectName: editlog.projectName,
      submittedBy: name,
      score: editlog.score,
      upgradedOn: dateArr,
      // upgradedBy:editlog.upgradedBy,
    };
    editlogArr.push(editlogResult);
  }
  res.json(editlogArr);
});

module.exports = scoreEditLog;
