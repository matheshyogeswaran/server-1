const express = require("express");
const editquestionRoutes = express.Router();
const EditQuestionData = require('../models/editQuesion.model');

editquestionRoutes.route('/').get(function(req, res) {
    EditQuestionData.find(function(err, todo) {
        if (err) {
            console.log(err);
        } else {
            res.json(todo);
        }
    });
  });
  
  editquestionRoutes.route('/add').post(function(req, res) {
    let editquestion = new EditQuestionData(req.body);
    editquestion.save()
        .then(editquestion => {
            res.status(200).json({'Article': 'Article history added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new Article history failed');
        });
});

module.exports = editquestionRoutes;

 