 

const express = require("express");
const Unit = express.Router();
const UnitData = require('../models/unit.model');

Unit.route('/').get(function(req, res) {
  UnitData.find(function(err, units) {
        if (err) {
            console.log(err);
        } else {
            res.json(units);
        }
    });
});

Unit.route('/:id').get(function(req, res) {
    let id = req.params.id;
    UnitData.findById(id, function(err, units) {
        res.json(units);
    });
});

Unit.route('/add').post(function(req, res) {
    let units = new UnitData(req.body);
    units.save()
        .then(units => {
            res.status(200).json({'units': 'unit added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new unit failed');
        });
});

Unit.route('/update/:id').post(function(req, res) {
  UnitData.findById(req.params.id, function(err, units) {
        if (!units) {
            res.status(404).send('data is not found');
        } else {
          units.unitName = req.body.unitName;
          units.unitDesc = req.body.unitDesc;
             
          units.save().then(units => {
                res.status(200).json({'units': 'unit updated successfully'});
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
    
});


Unit.route('/delete/:id').delete((req, res, next) => {
  UnitData.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.status(200).json({
            'units': 'unit deleted successfully'
        })
      }
    })
  });

  Unit.route('/quizentry/update/:id').post(function(req, res) {
    UnitData.findById(req.params.id, function(err, units) {
        if (!units) {
            res.status(404).send('data is not found');
        } else {
          units.quiz.quizName = req.body.quizName;
          units.quiz.quizDesc = req.body.quizDesc;
             
          units.save().then(units => {
                res.status(200).json({'units': 'unit updated successfully'});
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
  });

  Unit.get('/units/quizentry/:id', async (req, res) => {
    try {
      const unit = await UnitData.findOne({_id: req.params.id});
      res.json(unit.quiz);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  Unit.post('/:id/quiz', async (req, res) => {
    try {
      const unit = await UnitData.findById(req.params.id);
      if (!unit) {
        return res.status(404).json({ message: 'Unit not found' });
      }
  
      const newQuiz = {
        question: req.body.question,
        op1: req.body.op1,
        op2: req.body.op2,
        op3: req.body.op3,
        op4: req.body.op4,
      };
       
      unit.quiz.questions.push(newQuiz);
  
      const updatedUnit = await unit.save();
  
      res.json(updatedUnit);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
    
   

  Unit.post('/:unitId/update/:id', async (req, res) => {
  const { unitId, id } = req.params;
  const { question, op1, op2, op3, op4 } = req.body;

  try {
    const updatedQuestion = await UnitData.findOneAndUpdate(
      { _id: unitId, "quiz.questions._id": id },
      {
        $set: {
          "quiz.questions.$.question": question,
          "quiz.questions.$.op1": op1,
          "quiz.questions.$.op2": op2,
          "quiz.questions.$.op3": op3,
          "quiz.questions.$.op4": op4
        }
      },
      { new: true }
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

Unit.delete('/:unitId/delete/:id', async (req, res) => {
  const { unitId, id } = req.params;

  try {
    const updatedQuestion = await UnitData.findByIdAndUpdate(
      unitId,
      { $pull: { "quiz.questions": { _id: id } } },
      { new: true }
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});   

module.exports = Unit;