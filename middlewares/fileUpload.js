const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "images";
        if (file.fieldname == "coverImage") {
            folder = `uploads/${req.user._id}`;
        } else if (file.fieldname == "profileImage") {
            folder = "images";
        }
        const uploadPath = path.join(path.resolve(), "./public", folder);
        // Ensure the directory exists 
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()} - ${file.originalname}`;
        cb(null, filename);
    }
});

const fileUpload = multer({ storage: storage });
module.exports = fileUpload;