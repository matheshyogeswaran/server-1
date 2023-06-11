const express = require("express");
const feedback = express.Router();

const FinalProjSubmission = require("../models/finalProjectAssignment.model");
const Users = require("../models/user.model");

feedback.get("/getFeedback/:currentUser", async (req, res) => {
  try {
    const currentUser = req.params.currentUser;
    const projSubmi = await FinalProjSubmission.findOne({
      userId: currentUser,
    });

    // if project submission is not found
    if (!projSubmi) {
      return res.status(404).json({ error: "Project submission not found" });
    }
    let feedbackData = {};
    // if suoervisor allow to show the feedback to employee,continue
    if (projSubmi?.show) {
      const user = await Users.findOne({
        _id: projSubmi?.gradedBy,
      });
      const supName = user?.firstName + " " + user?.lastName;
      const supImage = user?.userImage;
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let date = projSubmi?.gradedOn;
      let year = date?.getFullYear();
      let month = monthNames[date?.getMonth()];
      let datee = date?.getDate();
      let day = days[date?.getDay()];

      let hours = date?.getHours();
      const dayNight = hours < 13 ? "AM" : "PM";
      hours < 13 ? (hours = hours) : (hours -= 12);
      hours < 10 ? (hours = "0" + hours) : (hours = hours);

      let minutes = date?.getMinutes();
      minutes < 10 ? (minutes = "0" + minutes) : (minutes = minutes);

      let gradedOn =
        day +
        ", " +
        datee +
        " " +
        month +
        " " +
        year +
        ", " +
        hours +
        ":" +
        minutes +
        " " +
        dayNight;

      feedbackData = {
        projectName: projSubmi?.projectName,
        score: projSubmi?.projectScore,
        feedback: projSubmi?.feedback,
        gradedOn,
        gradedBy: supName,
        supervisorImage: supImage,
        show: projSubmi?.show,
      };
    } else {
      feedbackData = {
        show: projSubmi?.show,
      };
    }
    res.json(feedbackData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = feedback;
