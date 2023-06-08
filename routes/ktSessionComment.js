const express = require("express");
const ktSessionCommentRoutes = express.Router();
const ktSessionComment = require("../models/ktSession.model");

ktSessionCommentRoutes.route("/get-all-kt").get(function (req, res) {
  ktSessionComment.find({}, (err, kts) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(kts);
    }
  });
});

ktSessionCommentRoutes
  .route("/get-kt-comments-by-kt-id/:ktId")
  .get(function (req, res) {
    const { ktId } = req.params;
    ktSessionComment.findById(ktId, (err, comments) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(comments);
      }
    });
  });

ktSessionCommentRoutes.route("/create-kt").post(async (req, res) => {
  const comment = new ktSessionComment(req.body);
  comment
    .save()
    .then(() =>
      res.status(200).json({
        message: "Your request is successful",
      })
    )
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Your request is unsuccessful", error: err });
    });
});

ktSessionCommentRoutes.route("/add-kt-comment/:ktId").post(async (req, res) => {
  try {
    const ktId = req.params.ktId;
    const kt = await ktSessionComment.findById(ktId);

    kt.comments.push(req.body);
    kt.save();

    res.status(200).json({
      message: "Your request is successful",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Your request is unsuccessful", error: err });
  }
});

ktSessionCommentRoutes
  .route("/add-kt-comment-replies/:ktId/:comId")
  .post(async (req, res) => {
    try {
      const { ktId, comId } = req.params;
      const kt = await ktSessionComment.findById(ktId);
      const comment = kt.comments.id(comId);

      comment.replies.push(req.body);
      kt.save();

      res.status(200).json({
        message: "Your request is successful",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Your request is unsuccessful", error: err });
    }
  });

module.exports = ktSessionCommentRoutes;
