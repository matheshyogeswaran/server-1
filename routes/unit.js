const express = require("express");
const unit = express.Router();

const chapters = require("../models/chapter.model");
const units = require("../models/unit.model");

unit.get("/unit", async (req, res) => {
  let unitsData = [];
  let chapterData = await chapters.find();

  for (let chapter of chapterData) {
    for (let i = 0; i < chapter.unitsOffer.length; i++) {
      let unitCollection = await units.findOne({
        _id: chapter.unitsOffer[i],
      });
      let chapName = chapter.chapterName;
      let unitId = unitCollection._id;
      let unitName = unitCollection.unitName;

      let newUnit = {
        unitId,
        unitName,
        chapName,
      };
      unitsData.push(newUnit);
    }
  }
  res.json(unitsData);
});

module.exports = unit;
