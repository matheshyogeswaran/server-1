const express = require("express");
const jobtitleRoutes = express.Router();
const Jobtitle = require("../models/jobtitle.model");

jobtitleRoutes.route("/jobtitles/showAllJobtitles").get(function (req, res) {
  Jobtitle.find({}, (err, jobtitles) => {
    if (err) {
      res.send(err);
    } else {
      res.json(jobtitles);
    }
  });
});

jobtitleRoutes.route("/jobtitles/isJobtitleAvailable").post(function (req, res) {
    const jobTitlename = req.body.jobTitlename;
    Jobtitle.findOne({ jobtitlename: jobTitlename }, (err, jobtitles) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        if (jobtitles) {
          res.json({ status: true });
          console.log(true);
        } else {
          res.json({ status: false });
          console.log(false);
        }
      }
    });
});

module.exports = jobtitleRoutes;