const express = require("express");
const forumRoutes = express.Router();
const Forum = require("../models/discussionForum.model");

forumRoutes.route("/get-forums-by-chapter/:chptId").get(function (req, res) {
  const { chptId } = req.params;
  Forum.find({ belongsToChapter: chptId }, (err, tickets) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(tickets);
    }
  });
});

forumRoutes
  .route("/get-forum-details-by-forum-id/:id")
  .get(function (req, res) {
    const { id } = req.params;
    Forum.findById(id, (err, tickets) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(tickets);
      }
    });
  });

forumRoutes.route("/edit-forum/:id").put(function (req, res) {
  const { id } = req.params;
  Forum.findByIdAndUpdate(id, req.body, (err, forums) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json({
        message: "Your request is successful",
      });
    }
  });
});

forumRoutes.route("/create-forum").post(async (req, res) => {
  const forum = new Forum(req.body);
  forum
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

forumRoutes.route("/add-posts/:forumId").post(async (req, res) => {
  try {
    const forumId = req.params.forumId;
    const forum = await Forum.findById(forumId);

    forum.posts.push(req.body);
    forum.save();

    res.status(200).json({
      message: "Your request is successful",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Your request is unsuccessful", error: err });
  }
});

forumRoutes.route("/add-replies/:forumId/:postId").post(async (req, res) => {
  try {
    const { forumId, postId } = req.params;
    const forum = await Forum.findById(forumId);
    const post = forum.posts.id(postId);

    post.replies.push(req.body);
    forum.save();

    res.status(200).json({
      message: "Your request is successful",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Your request is unsuccessful", error: err });
  }
});

module.exports = forumRoutes;
