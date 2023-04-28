const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/finalAssignmentSubmissions");
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["application/x-zip-compressed", "application/octet-stream", "application/zip"]
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let finalAssignmentSubmissionsUpload = multer({ storage, fileFilter });

module.exports = {
    finalAssignmentSubmissionsUpload
};