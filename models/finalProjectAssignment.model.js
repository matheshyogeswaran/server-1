const mongoose = require("mongoose");

const FinalProjectAssignment = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "UserData" },
    requestedDate: { type: Date, default: Date.now() },

    isProjectAssigned:{type:Boolean, default: false},
    isProjectSubmitted:{type:Boolean, default: false},

    projectName: { type: String },
    projectDescription: { type: String },
    projectDeadLine: { type: Date },

    uploadedFileBySupervisor: { type: String },
    supAttachOriginalName: { type: String },
    supAttachFileSize: { type: String },
    assignedOn:{type:Date},
    acceptedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },

    uploadedFileByEmployee: { type: String },
    uploadedDescriptionByEmployee: { type: String },
    empAttachOriginalName: { type: String },
    empAttachFileSize: { type: String },
    submittedDate: { type: Date },

    // Note
    // Use the name uploadedFileByEmployee for better understanding
    // Because, Both Supervisor, Hired Employees Submissions are here. 
    // submittedFile: { type: String }, 

    projScore: { type: Number, default: 0 },
    feedback: { type: String },
    gradedOn: { type: Date },
    gradedBy: { type: mongoose.Types.ObjectId, ref: "UserData" },


    status: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
  },
  {
    collection: "finalprojectassignments",
  }
);

const model = mongoose.model("FinalProjectAssignmentData", FinalProjectAssignment);
module.exports = model;