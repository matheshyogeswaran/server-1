const express = require("express");
const forumRoutes = express.Router();
const Forum = require("../models/discussionForum.model");

forumRoutes.route("/get-forums-by-chapter/:chptId").get(function (req, res) {
  const { chptId } = req.params;
  Forum.find({ belongsToChapter: chptId })
    .populate("createdBy")
    .exec((err, forums) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(forums);
      }
    });
});

forumRoutes
  .route("/get-forum-details-by-forum-id/:id")
  .get(function (req, res) {
    const { id } = req.params;
    Forum.findById(id)
      .populate("createdBy")
      .populate("posts.createdBy")
      .populate("posts.replies.createdBy")
      .exec((err, forum) => {
        if (err) {
          res.status(500).send(err);
        } else {
          const sortedPosts = forum.posts.sort(
            (a, b) => b.createdOn - a.createdOn
          );

          sortedPosts.forEach((post) => {
            post.replies.sort((a, b) => b.createdOn - a.createdOn);
          });

          forum.posts = sortedPosts;
          res.status(200).send([forum]);
        }
      });
  });

forumRoutes
  .route("/get-post-details-by-post-id/:forumId/:postId")
  .get(async (req, res) => {
    try {
      const { forumId, postId } = req.params;

      const forum = await Forum.findById(forumId);
      if (!forum) {
        return res.status(500).send(err);
      }

      const post = forum.posts.id(postId);
      if (!post) {
        return res.status(500).send(err);
      }
      res.status(200).send([post]);
    } catch (err) {
      res.status(500).send(err);
    }
  });

forumRoutes
  .route("/get-reply-details-by-reply-id/:forumId/:postId/:replyId")
  .get(async (req, res) => {
    try {
      const { forumId, postId, replyId } = req.params;

      const forum = await Forum.findById(forumId);
      if (!forum) {
        return res.status(500).send(err);
      }

      const post = forum.posts.id(postId);
      if (!post) {
        return res.status(500).send(err);
      }

      const reply = post.replies.id(replyId);
      if (!reply) {
        return res.status(500).send(err);
      }
      res.status(200).send([reply]);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
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
