const mongoose = require('mongoose');
const User = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, required: true },
        dob: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        emailAddress: { type: String, required: true, unique: true},
        department: { type: String, required: true },
        userRole: { type: String, required: true, default:"Hired Employee" },
        jobPosition: { type: String, required: true },
        verified: { type: String,  default:"false"},
        userStatus: { type: String,  default:"active" },
        SubmittedOn: { type: String,  default:Date.now},
    },
    {
        collection: "users"
    }
)
const model = mongoose.model('UserData', User);
module.exports = model;