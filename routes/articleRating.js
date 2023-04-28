const express = require("express");
const Article = express.Router();

const Articles = require("../models/article.model");
const Users = require("../models/user.model");

Article.get("/articleRatings/:empId", async (req, res) => {
  try {
    let reqEmpId = req.params.empId;
    let [user] = await Users.find({ empId: reqEmpId }).select({ _id: 1 });
    // if user not found
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found in the article section" });
    }

    //find articles of requested user
    let articleRatings = await Articles.find({ createdBy: user?._id });
    let articleRatingsData = {};

    // if the required employee written article, continue
    if (articleRatings.length > 0) {
      let overAllRating = 0;
      let overAllQuality = 0;
      let overAllComm = 0;
      let overAllClarity = 0;
      let overAllKnowledgeAndSkill = 0;

      //initializing data to progress bar
      let overAllRatingData = [];
      let overAllQualityData = [];
      let overAllCommData = [];
      let overAllClarityData = [];
      let overAllKnowledgeAndSkillData = [];

      for (let ratings of articleRatings) {
        //data to progress bar
        overAllRatingData.push(ratings.overallRating);
        overAllQualityData.push(ratings.overallQuality);
        overAllCommData.push(ratings.overallComm);
        overAllClarityData.push(ratings.overallClarity);
        overAllKnowledgeAndSkillData.push(ratings.overallKnowledgeAndSkill);

        //storing overAllRating
        overAllRating += ratings.overallRating;
        overAllQuality += ratings.overallQuality;
        overAllComm += ratings.overallComm;
        overAllClarity += ratings.overallClarity;
        overAllKnowledgeAndSkill += ratings.overallKnowledgeAndSkill;
      }

      //progressbar data calculation
      const individualRates = (overAllRatingData) => {
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;
        let count5 = 0;
        //counting how many 1 stars,2 stars,3 stars,4 stars,5 stars
        overAllRatingData.map((data) =>
          data === 1
            ? count1++
            : data === 2
            ? count2++
            : data === 3
            ? count3++
            : data === 4
            ? count4++
            : count5++
        );
        //sum of stars
        let totalCount = count1 + count2 + count3 + count4 + count5;
        overAllRatingData = [
          parseFloat(((count1 / totalCount) * 100).toFixed(2)),
          parseFloat(((count2 / totalCount) * 100).toFixed(2)),
          parseFloat(((count3 / totalCount) * 100).toFixed(2)),
          parseFloat(((count4 / totalCount) * 100).toFixed(2)),
          parseFloat(((count5 / totalCount) * 100).toFixed(2)),
        ];

        return overAllRatingData;
      };

      //data for progress bar
      overAllRatingData = individualRates(overAllRatingData);
      overAllQualityData = individualRates(overAllQualityData);
      overAllCommData = individualRates(overAllCommData);
      overAllClarityData = individualRates(overAllClarityData);
      overAllKnowledgeAndSkillData = individualRates(
        overAllKnowledgeAndSkillData
      );

      //rating
      let finalOverAllRating = (overAllRating / articleRatings.length).toFixed(
        1
      );
      let finalOverAllQuality = (
        overAllQuality / articleRatings.length
      ).toFixed(1);
      let finalOverAllComm = (overAllComm / articleRatings.length).toFixed(1);
      let finalOverAllClarity = (
        overAllClarity / articleRatings.length
      ).toFixed(1);
      let finalOverAllKnowledgeAndSkill = (
        overAllKnowledgeAndSkill / articleRatings.length
      ).toFixed(1);

      //data for progress bar
      let ratingData = [
        overAllQualityData,
        overAllCommData,
        overAllClarityData,
        overAllKnowledgeAndSkillData,
      ];

      articleRatingsData = {
        finalOverAllRating,
        finalOverAllQuality,
        finalOverAllComm,
        finalOverAllClarity,
        finalOverAllKnowledgeAndSkill,
        numOfArticles: articleRatings.length,
        overAllRatingData,
        ratingData,
      };
    }
    res.json(articleRatingsData);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = Article;
