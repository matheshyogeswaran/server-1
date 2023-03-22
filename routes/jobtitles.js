const express = require("express");
const jobtitleRoutes = express.Router();
const Department = require("../models/department.model");


jobtitleRoutes.route("/jobtitles").get(function (req, res) {
  res.json([
    {
      url: "http://localhost:1337/jobtitles/showAllJobtitles",
      method: "get",
      desc: "Shows all jobtitle's data from database",
    },
  ]);
});

jobtitleRoutes.route("/jobtitles/showAllJobtitles").get(function (req, res) {
  Department.find({}, (err, jobtitles) => {
    if (err) {
      res.send(err);
    } else {
      res.json(jobtitles);
    }
  });
});

jobtitleRoutes
  .route("/jobtitles/isJobtitleAvailable")
  .post(function (req, res) {
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

jobtitleRoutes.route("/jobtitles/addJobtitle").post(async (req, res) => {
  const jobTitlename = req.body.jobtitleName;
  const depID = req.body.depID;
  // //const createdBy = "Name";
  const createdOn = Date.now();

  Department.findById(depID, (err, department) => {
    if (err) {
      console.log(err);
    } else {
      // Add some new marks to the array
      department.Jobtitle.push({ jobTitlename: jobTitlename, createdOn: createdOn });
      // Save the updated document
      department.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            message: "Jobtitle Added Successfully",
            status: true,
          })
        }
      });
    }
  });
  // 8888888888888888888888888888888888888888888888888888888888888888

  // jobtitleDetails
  //   .save()
  //   .then((item) =>
  //     res.json({
  //       message: "Jobtitle Added Successfully",
  //       status: true,
  //     })
  //   )
  // .catch((err) => {
  //   if (err.code === 11000) {
  //     return res.json({
  //       message: "Jobtitle already exists",
  //       status: false,
  //     });
  //   }
  //   res.status(500).send({ error: err });
  //   console.log(err);
  // });
});

jobtitleRoutes.route("/jobtitles/editJobtitle").post(async (req, res) => {
  // console.log(req.body);
  newName = req.body.newName;
  reason = req.body.reason;
  editedId = req.body.editedId;
  fromName = req.body.fromName;
  const newReasonObject = {
    reasonID: Math.floor(Date.now()) / 1000,
    reasonValue: reason,
    modifiedBy: "Ishvini",
    fromName: fromName,
    toName: newName,
  };
  try {
    const document = await Jobtitle.findById(editedId);
    document.reasons.push(newReasonObject);
    Jobtitle.updateOne(
      { _id: editedId },
      { $set: { jobTitlename: newName, reasons: document.reasons } }
    )
      .then((result) => {
        return res.json({
          message: "Jobtitle Name Updated Successfully",
          status: true,
        });
      })
      .catch((err) => {
        return res.json({
          message: "Error in Updating Jobtitle Name",
          status: false,
        });
      });
  } catch {
    return res.json({
      message: "Jobtitle Not Found. Try Again !!!",
      status: false,
    });
  }
  // ------------------------------------------------------------------------------
});

jobtitleRoutes.route("/jobtitles/deleteJobtitle").post(async (req, res) => {
  const id = req.body.id;
  const reason = req.body.reason;
  try {
    const departments = await Department.findOne({ "Jobtitle._id": id });
    // Remove the job title from the Jobtitle array
    departments.Jobtitle = departments.Jobtitle.filter(
      (jobtitle) => jobtitle._id.toString() !== id
    );

    // Save the updated Department object
    await departments.save();

    return res.json({
      message: "Jobtitle deleted successfully",
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Error deleting jobtitle",
      status: false,
    });
  }
})

module.exports = jobtitleRoutes;
