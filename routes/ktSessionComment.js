const express = require("express");
const ktSessionCommentRoutes = express.Router();
const ktSessionComment = require("../models/ktSession.model");
const moment = require("moment");

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
    ktSessionComment
      .findById(ktId)
      .populate("comments.addedBy")
      .populate("comments.replies.addedBy")
      .exec((err, comment) => {
        if (err) {
          res.status(500).send(err);
        } else {
          const sortedComments = comment.comments.sort(
            (a, b) => new Date(b.commentedOn) - new Date(a.commentedOn)
          );

          sortedComments.forEach((comment) => {
            comment.replies.sort(
              (a, b) => new Date(b.repliedOn) - new Date(a.repliedOn)
            );
          });

          comment.comments = sortedComments;
          res.status(200).send(comment.comments);
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
    let newComment = {
      ...req.body,
      commentedOn: moment().format("YYYY-MM-DD hh:mm:ss.SS A"),
    };
    kt.comments.push(newComment);
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

      let newReply = {
        ...req.body,
        repliedOn: moment().format("YYYY-MM-DD hh:mm:ss.SS A"),
      };

      comment.replies.push(newReply);
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
