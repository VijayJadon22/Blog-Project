const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.resolve(), "public", "images"));
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()} - ${file.originalname}`;
        cb(null, filename);
    }
});

const fileUpload = multer({ storage: storage });
module.exports = fileUpload;