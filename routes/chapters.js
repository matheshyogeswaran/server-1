const express = require("express");   //import express module
const chapterRoutes = express.Router();
const Chapter = require("../models/chapter.model");  //import the chapter model

chapterRoutes.route("/chapters").get(function (req, res) {
  res.json([
    {
      url: "http://localhost:1337/chapters/showAllChapters",  //endpoint
      method: "get",
      desc: "Shows all Chapter's data from database",
    },
  ]);
});

chapterRoutes.route("/chapters/showAllChapters").get(async (req, res) => {
  //await is used by async to wait for the result of two mongodb populate queries.
  const chapters = await Chapter.find({}).populate("depID").populate("createdBy");
  //populate method is used to replace a document's ObjectId reference fields with their actual referenced document.here the 'depID' field and the 'createdBy' field are populated with their corresponding referenced documents.
  res.json(chapters);
});

chapterRoutes.route("/chapters/isChapterAvailable").post(function (req, res) {
  const chaptername = req.body.chaptername;
  Chapter.findOne({ chaptername: chaptername }, (err, chapters) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (chapters) {
        res.json({ status: true });
        console.log(true);
      } else {
        res.json({ status: false });
        console.log(false);
      }
    }
  });
});

//----------------------------------------------------------------------------------------

chapterRoutes.route("/chapters/addChapter").post(async (req, res) => {

  const chapterName = req.body.chapterName;
  const depID = req.body.depID;
  const createdBy = req.body.userID;
  const createdOn = Date.now();

  const chapterDetails = new Chapter({
    chapterName,
    depID,
    createdBy,
    createdOn,
  });
  chapterDetails
    .save()
    .then((item) =>
      res.json({
        message: "Chapter Added Successfully",
        status: true,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        return res.json({
          message: "Chapter already exists",
          status: false,
        });
      }
      console.log(err);
      res.status(500).send({ error: err });
    });
});
//----------------------------------------------------------------------------------

chapterRoutes.route("/chapters/editChapter").post(async (req, res) => {
  // console.log(req.body);
  newName = req.body.newName;
  reason = req.body.reason;
  editedId = req.body.editedId;
  fromName = req.body.fromName;
  const newReasonObject = {
    reasonID: Math.floor(Date.now()) / 1000,
    reasonValue: reason,
    modifiedBy: "Ishvini",
    fromName: fromName,
    toName: newName,
  };
  try {
    const document = await Chapter.findById(editedId);
    document.reasons.push(newReasonObject);
    Chapter.updateOne(
      { _id: editedId },
      { $set: { chapterName: newName, reasons: document.reasons } }
    )
      .then((result) => {
        return res.json({
          message: "Chapter Name Updated Successfully",
          status: true,
        });
      })
      .catch((err) => {
        return res.json({
          message: "Error in Updating Chapter Name",
          status: false,
        });
      });
  } catch {
    return res.json({
      message: "Chapter Not Found. Try Again !!!",
      status: false,
    });
  }
});
// ------------------------------------------------------------------------------

chapterRoutes.route("/chapters/deleteChapter").post(async (req, res) => {
  id = req.body.id;
  try {
    const deletedChapter = await Chapter.deleteOne({ _id: id });
    return res.json({
      message: "Chapter Deleted Successfully",
      status: true,
    });
  } catch (error) {
    return res.json({
      message: "Error...!",
      status: false,
    });
  }
});

//-----------------------------------------------------------------------------------
chapterRoutes.route("/chapters/:id").put(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  Chapter.findByIdAndUpdate(id, { status: status }, { new: true })
    .then(updatedChapter => {
      if (!updatedChapter) {
        return res.status(404).send({
          message: `Chapter is not found.`
        });
      }
      res.send({
        message: `Chapter was temporarly deleted successfully.`,
        data: updatedChapter
      });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error deleting Chapter : ${err.message}`
      });
    });
});
//------------------------------------------------------------------------------------------

chapterRoutes.route("/chapters/enrollChapter").post(async (req, res) => {
  const chapID = req.body.chapID;
  const userID = req.body.userID;
  try {
    const document = await Chapter.findById(chapID);
    document.requested.push(userID);
    Chapter.updateOne(
      { _id: chapID },
      { $set: { requested: document.requested } }
    )
      .then((result) => {
        return res.json({
          message: "Chapter requested Successfully",
          status: true,
        });
      })
      .catch((err) => {
        return res.json({
          message: "Error in requesting Chapter Name",
          status: false,
        });
      });
  } catch {
    return res.json({
      message: "Chapter Not Found. Try Again !!!",
      status: false,
    });
  }

});

//--------------------------------------------------------------------------------------------
chapterRoutes.route("/chapters/getEnrolledChapters/:depID").get(async (req, res) => {
  const depID = req.params.depID;  //The value of the 'depID' parameter is assigned to a constant variable 'depID'.
  const chapters = await Chapter.find({ depID: depID }).populate("depID").populate("requested")
  res.json(chapters);
});

//---------------------------------------------------------------------------------------------------
module.exports = chapterRoutes;
















// const express = require("express");   //import express module
// const chapterRoutes = express.Router();
// const Chapter = require("../models/chapter.model");  //import the chapter model

// chapterRoutes.route("/chapters").get(function (req, res) {
//   res.json([
//     {
//       url: "http://localhost:1337/chapters/showAllChapters",  //endpoint
//       method: "get",
//       desc: "Shows all Chapter's data from database",
//     },
//   ]);
// });

// chapterRoutes.route("/chapters/showAllChapters").get(async (req, res) => {
//   //await is used by async to wait for the result of two mongodb populate queries.
//   const chapters = await Chapter.find({}).populate("depID").populate("createdBy");
//   //populate method is used to replace a document's ObjectId reference fields with their actual referenced document.here the 'depID' field and the 'createdBy' field are populated with their corresponding referenced documents.
//   res.json(chapters);
// });

// chapterRoutes.route("/chapters/isChapterAvailable").post(function (req, res) {
//   const chaptername = req.body.chaptername;
//   Chapter.findOne({ chaptername: chaptername }, (err, chapters) => {
//     if (err) {
//       console.log(err);
//       res.send(err);
//     } else {
//       if (chapters) {
//         res.json({ status: true });
//         console.log(true);
//       } else {
//         res.json({ status: false });
//         console.log(false);
//       }
//     }
//   });
// });

// //----------------------------------------------------------------------------------------

// chapterRoutes.route("/chapters/addChapter").post(async (req, res) => {

//   const chapterName = req.body.chapterName;
//   const depID = req.body.depID;
//   const createdBy = req.body.userID;
//   const createdOn = Date.now();

//   const chapterDetails = new Chapter({
//     chapterName,
//     depID,
//     createdBy,
//     createdOn,
//   });
//   chapterDetails
//     .save()
//     .then((item) =>
//       res.json({
//         message: "Chapter Added Successfully",
//         status: true,
//       })
//     )
//     .catch((err) => {
//       if (err.code === 11000) {
//         return res.json({
//           message: "Chapter already exists",
//           status: false,
//         });
//       }
//       console.log(err);
//       res.status(500).send({ error: err });
//     });
// });
// //----------------------------------------------------------------------------------

// chapterRoutes.route("/chapters/editChapter").post(async (req, res) => {
//   // console.log(req.body);
//   newName = req.body.newName;
//   reason = req.body.reason;
//   editedId = req.body.editedId;
//   fromName = req.body.fromName;
//   const newReasonObject = {
//     reasonID: Math.floor(Date.now()) / 1000,
//     reasonValue: reason,
//     modifiedBy: "Ishvini",
//     fromName: fromName,
//     toName: newName,
//   };
//   try {
//     const document = await Chapter.findById(editedId);
//     document.reasons.push(newReasonObject);
//     Chapter.updateOne(
//       { _id: editedId },
//       { $set: { chapterName: newName, reasons: document.reasons } }
//     )
//       .then((result) => {
//         return res.json({
//           message: "Chapter Name Updated Successfully",
//           status: true,
//         });
//       })
//       .catch((err) => {
//         return res.json({
//           message: "Error in Updating Chapter Name",
//           status: false,
//         });
//       });
//   } catch {
//     return res.json({
//       message: "Chapter Not Found. Try Again !!!",
//       status: false,
//     });
//   }
// });
// // ------------------------------------------------------------------------------

// chapterRoutes.route("/chapters/deleteChapter").post(async (req, res) => {
//   id = req.body.id;
//   try {
//     const deletedChapter = await Chapter.deleteOne({ _id: id });
//     return res.json({
//       message: "Chapter Deleted Successfully",
//       status: true,
//     });
//   } catch (error) {
//     return res.json({
//       message: "Error...!",
//       status: false,
//     });
//   }
// });

// //-----------------------------------------------------------------------------------
// chapterRoutes.route("/chapters/:id").put(async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   Chapter.findByIdAndUpdate(id, { status: status }, { new: true })
//     .then(updatedChapter => {
//       if (!updatedChapter) {
//         return res.status(404).send({
//           message: `Chapter is not found.`
//         });
//       }
//       res.send({
//         message: `Chapter was temporarly deleted successfully.`,
//         data: updatedChapter
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: `Error deleting Chapter : ${err.message}`
//       });
//     });
// });
// //------------------------------------------------------------------------------------------

// chapterRoutes.route("/chapters/enrollChapter").post(async (req, res) => {
//   const chapID = req.body.chapID;
//   const userID = req.body.userID;
//   try {
//     const document = await Chapter.findById(chapID);
//     document.requested.push(userID);
//     Chapter.updateOne(
//       { _id: chapID },
//       { $set: { requested: document.requested } }
//     )
//       .then((result) => {
//         return res.json({
//           message: "Chapter requested Successfully",
//           status: true,
//         });
//       })
//       .catch((err) => {
//         return res.json({
//           message: "Error in requesting Chapter Name",
//           status: false,
//         });
//       });
//   } catch {
//     return res.json({
//       message: "Chapter Not Found. Try Again !!!",
//       status: false,
//     });
//   }

// });

// //--------------------------------------------------------------------------------------------
// chapterRoutes.route("/chapters/getEnrolledChapters/:depID").get(async (req, res) => {
//   const depID = req.params.depID;  //The value of the 'depID' parameter is assigned to a constant variable 'depID'.
//   const chapters = await Chapter.find({ depID: depID }).populate("depID").populate("requested")
//   res.json(chapters);
// });

// //---------------------------------------------------------------------------------------------------

// module.exports = chapterRoutes;



