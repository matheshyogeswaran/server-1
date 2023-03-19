const express = require("express");
const chapter = express.Router();

const chapters = require("../models/chapter.model");

chapter.get("/chapter", async (req, res) => {
  let chapterData = await chapters.find();
  res.json(chapterData);
});

module.exports = chapter;
