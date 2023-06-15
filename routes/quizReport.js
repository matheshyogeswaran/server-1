const express = require("express");
const quizReport = express.Router();

const Users = require("../models/user.model");
const QuizSubmissions = require("../models/quizSubmission.model");
const Departments = require("../models/department.model");

quizReport.get("/quizReport/:unitId", async (req, res) => {
  try {
    const unitId = req.params.unitId;
    let finalData = [];
    const submissions = await QuizSubmissions.find();

    for (let sub of submissions) {
      //check whether the both requested unitId and submission unitId are equal
      if (sub.unitId.toString() === unitId) {
        const user = await Users.findOne({ _id: sub.userId });
        const name = user?.firstName + " " + user.lastName;
        //date calculation
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
        let date = sub?.submittedTime;
        let year = date?.getFullYear();
        let month = monthNames[date?.getMonth()];
        let day = days[date?.getDay()];

        //date calculation
        let datee = date?.getDate();
        datee < 10 ? (datee = "0" + datee) : (datee = datee);
        datee === "01" || datee === "11" || datee === "21"
          ? (datee = datee + "st".sup())
          : datee === "02" || datee === "22"
          ? (datee = datee + "nd".sup())
          : datee === "03" || datee === "13"
          ? (datee = datee + "rd".sup())
          : (datee = datee + "th".sup());

        let hours = date?.getHours();
        let dayNight = hours < 13 || hours === 0 ? "AM" : "PM";
        hours < 13 ? (hours = hours) : (hours -= 12);
        hours < 10 ? (hours = "0" + hours) : (hours = hours);

        let minutes = date?.getMinutes();
        minutes < 10 ? (minutes = "0" + minutes) : (minutes = minutes);

        let seconds = date?.getSeconds();
        seconds < 10 ? (seconds = "0" + seconds) : (seconds = seconds);

        let submittedOn =
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
          ":" +
          seconds +
          " " +
          dayNight;
        date = sub.attemptedTime;
        year = date?.getUTCFullYear();
        month = monthNames[date?.getMonth()];
        day = days[date?.getDay()];

        //date calculation
        datee = date?.getDate();
        datee < 10 ? (datee = "0" + datee) : (datee = datee);
        datee === "01" || datee === "11" || datee === "21"
          ? (datee = datee + "st".sup())
          : datee === "02" || datee === "22"
          ? (datee = datee + "nd".sup())
          : datee === "03" || datee === "13"
          ? (datee = datee + "rd".sup())
          : (datee = datee + "th".sup());

        hours = date?.getHours();
        dayNight = hours < 13 || hours === 0 ? "AM" : "PM";
        hours < 13 ? (hours = hours) : (hours -= 12);
        hours < 10 ? (hours = "0" + hours) : (hours = hours);

        minutes = date?.getMinutes();
        minutes < 10 ? (minutes = "0" + minutes) : (minutes = minutes);

        seconds = date?.getSeconds();
        seconds < 10 ? (seconds = "0" + seconds) : (seconds = seconds);

        let attemptedOn =
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
          ":" +
          seconds +
          " " +
          dayNight;

        //calculating time taken
        let timeTaken = sub.submittedTime - sub.attemptedTime;
        const hour = Math.floor(timeTaken / (60 * 60 * 1000));
        const min = Math.floor((timeTaken % 3600000) / (60 * 1000));
        const sec = Math.floor((timeTaken % 60000) / 1000);
        timeTaken = hour + ":" + min + ":" + sec;

        // Fetch user department details
        const department = await Departments.findOne({ _id: user?.department });

        //assign all needed data of a specific submission in a object
        const data = {
          userId: sub?.userId,
          empId: user?.empId,
          userImage: user?.userImage,
          name,
          department: department?.depName,
          attemptedTime: attemptedOn,
          submittedTime: submittedOn,
          score: sub.score,
          timeTaken,
        };
        finalData.push(data);
      }
    }
    res.json(finalData);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = quizReport;
