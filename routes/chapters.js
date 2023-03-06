const express = require("express");
const chapterRoutes = express.Router();
const Chapter = require("../models/chapter.model");

chapterRoutes.route("/chapters").get(function (req, res) {
  res.json([
    {
      url: "http://localhost:1337/chapters/showAllChapters",
      method: "get",
      desc: "Shows all Chapter's data from database",
    },
  ]);
});

chapterRoutes.route("/chapters/showAllChapters").get(function (req, res) {
  Chapter.find({}, (err, chapters) => {
    if (err) {
      res.send(err);
    } else {
      res.json(chapters);
    }
  });
});

chapterRoutes.route("/chapters/isChapterAvailable").post(function (req, res) {
  const chaptername = req.body.chaptername;
  Chapter.findOne({ chaptername: chaptername }, (err, chapters) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (chapters) {
        res.json({ status: true });
        console.log(true);
      } else {
        res.json({ status: false });
        console.log(false);
      }
    }
  });
});

chapterRoutes.route("/chapters/addChapter").post(async (req, res) => {
  // console.log(req.body);
  const chaptername = req.body.chapterName;
  const depID = req.body.depID;
  const createdBy = "Name";
  const createdOn = Date.now();
  console.log(chaptername);
  const chapterDetails = new Chapter({
    chaptername,
    depID,
    createdBy,
    createdOn,
  });
  chapterDetails
    .save()
    .then((item) =>
      res.json({
        message: "Chapter Added Successfully",
        status: true,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        return res.json({
          message: "Chapter already exists",
          status: false,
        });
      }
      res.status(500).send({ error: err });
    });
});

chapterRoutes.route("/chapters/editChapter").post(async (req, res) => {
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
    const document = await Chapter.findById(editedId);
    document.reasons.push(newReasonObject);
    Chapter.updateOne(
      { _id: editedId },
      { $set: { chaptername: newName, reasons: document.reasons } }
    )
      .then((result) => {
        return res.json({
          message: "Chapter Name Updated Successfully",
          status: true,
        });
      })
      .catch((err) => {
        return res.json({
          message: "Error in Updating Chapter Name",
          status: false,
        });
      });
  } catch {
    return res.json({
      message: "Chapter Not Found. Try Again !!!",
      status: false,
    });
  }
  // ------------------------------------------------------------------------------
});

chapterRoutes.route("/chapters/deleteChapter").post(async (req, res) => {
  id = req.body.id;
  reason = req.body.reason;
  try {
    const deletedChapter = await Chapter.deleteOne({ _id: id });
    // res.status(200).json(deletedchapter);
    return res.json({
      message: "Chapter Deleted Successfully",
      status: true,
    });
  } catch (error) {
    return res.json({
      message: "Error...!",
      status: false,
    });
  }
});
module.exports = chapterRoutes;
