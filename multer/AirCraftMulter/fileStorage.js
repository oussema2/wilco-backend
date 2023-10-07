const multer = require("multer");
const path = require("path");

exports.aircraftpictureStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const imageName =
      file.originalname + "-" + Date.now() + path.extname(file.originalname);
    req.body.aicraft_picture = imageName;
    cb(null, imageName);
  },
});
