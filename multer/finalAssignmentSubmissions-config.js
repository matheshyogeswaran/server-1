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
    console.log("Hello")
    const allowedFileTypes = ["application/x-zip-compressed", "application/octet-stream", "application/zip"];
    const allowedExtensions = [".zip", ".rar", ".tar", ".7z"];

    const fileExtension = path.extname(file.originalname);
    const isValidFileType = allowedFileTypes.includes(file.mimetype);
    const isValidFileExtension = allowedExtensions.includes(fileExtension);

    if (isValidFileType && isValidFileExtension) {
        console.log("File Uploaded");
        cb(null, true);
    } else {
        cb(new Error("File type"));
    }
}

let finalAssignmentSubmissionsUpload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 50 }
});

module.exports = {
    finalAssignmentSubmissionsUpload
};