const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

exports.fileStorage = multer.diskStorage({
  destination: (req, file, cb, next) => {
    const picid = uuid.v4();
    console.log(req.pilot);
    let folderName;
    if (req.pilot) {
      if (!req.body.eventPic) {
        req.body.event_image = picid;
        try {
          if (!fs.existsSync(folderName)) {
            fs.mkdirSync(
              "./Media/Pilots/" +
                req.pilot.media_folder +
                "/Events/" +
                req.body.event_image
            );
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        folderName =
          "./Media/Pilots/" +
          req.pilot.media_folder +
          "/Events/" +
          req.body.event_image;
      }

      cb(
        null,
        (folderName =
          "./Media/Pilots/" +
          req.pilot.media_folder +
          "/Events/" +
          req.body.event_image)
      );
    } else {
      if (!req.body.event_image) {
        req.body.event_image = picid;
        try {
          if (!fs.existsSync("./Media/unauthorized")) {
            fs.mkdirSync("./Media/unauthorized");
          }
        } catch (err) {
          console.error(err);
        }
      }

      cb(null, "./Media/unauthorized");
    }
  },
  filename: (req, file, cb) => {
    const imageName =
      file.originalname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});
