const express = require("express");
const KtSession = express.Router();
const KtSessionData = require('../models/ktSession.model');
 
 
 
// KtSession.route('/').get(function(req, res) {
//     KtSessionData.find(function(err, ktsessions) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(ktsessions);
//         }
//     });
// });

KtSession.route('/').get(function(req, res) {
    const { unitId } = req.query;
  
    // Filter the KT sessions based on the unitId
    const query = unitId ? { belongsToUnit: unitId } : {};
  
    KtSessionData.find(query, function(err, ktsessions) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(ktsessions);
      }
    });
  });
  

KtSession.route('/:id').get(function(req, res) {
    let id = req.params.id;
    KtSessionData.findById(id, function(err, ktsessions) {
        res.send([ktsessions]);
    });
});

KtSession.route('/add/:id').post(function(req, res) {
    let ktsessions = new KtSessionData(req.body);

    ktsessions.save()
        .then(ktsessions => {
            res.status(200).json({'ktsessions': 'KT added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new KT failed');
        });
});

KtSession.route('/update/:id').post(function(req, res) {
    KtSessionData.findById(req.params.id, function(err, ktsessions) {
        if (!ktsessions)
            res.status(404).send('data is not found');
        else
        ktsessions.sessionName = req.body.sessionName;
        ktsessions.sessionDesc = req.body.sessionDesc;
        ktsessions.sessionUrl = req.body.sessionUrl;    

        ktsessions.save().then(ktsessions => {
                res.json('KT updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


KtSession.route('/delete/:id').delete((req, res, next) => {
    KtSessionData.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.status(200).json({
            'ktsessions': 'KT deleted successfully'
        })
      }
    })
  });



module.exports = KtSession;