const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

exports.fileStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    if (req.media && req.media.length > 0) {
      req.media.push(file);
    } else {
      req.media = [file];
    }
    const imageName =
      file.originalname + "-" + Date.now() + path.extname(file.originalname);
    // req.body.post_media = !req.body.post_media ? [] : req.body.post_media;
    // req.body.post_media.push(imageName);
    cb(null, imageName);
  },
});
