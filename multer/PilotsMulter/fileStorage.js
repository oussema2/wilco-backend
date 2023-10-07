const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

exports.fileStorage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   // const picid = uuid.v4();
  //   // let folderName;
  //   // if (!req.body.id) {
  //   //   folderName = `/${picid}`;
  //   //   req.body.media_folder_id = picid;
  //   //   try {
  //   //     if (!fs.existsSync(folderName)) {
  //   //       fs.mkdirSync("./Media/Pilots" + folderName);
  //   //       fs.mkdirSync("./Media/Pilots" + folderName + "/ProfilePicture");
  //   //       fs.mkdirSync("./Media/Pilots" + folderName + "/Posts");
  //   //       fs.mkdirSync("./Media/Pilots" + folderName + "/Events");
  //   //     }
  //   //   } catch (err) {
  //   //     console.error(err);
  //   //   }
  //   // } else {
  //   //   folderName = `/${req.body.media_folder_id}`;
  //   // }
  //cb(null, "./Media/Pilots" + folderName + "/ProfilePicture");
  // },
  filename: (req, file, cb) => {
    const imageName =
      file.originalname + "-" + Date.now() + path.extname(file.originalname);
    // req.body.profile_picture = imageName;
    cb(null, imageName);
  },
});

exports.updateProfilePic = multer.diskStorage({
  destination: (req, file, cb) => {
    const oldPicPath =
      "./Media/" +
      req.pilot.media_folder_id +
      "/ProfilePicture/" +
      req.body.profile_picture;
    rmDir("./Media/Pilots" + req.pilot.media_folder_id + "/ProfilePicture");
    cb(null, "./Media/Pilots" + req.pilot.media_folder_id + "/ProfilePicture");
  },
  filename: (req, file, cb) => {
    const imageName =
      file.originalname + "-" + Date.now() + path.extname(file.originalname);
    req.body.profile_picture = imageName;
    cb(null, imageName);
  },
});

rmDir = function (dirPath) {
  try {
    var files = fs.readdirSync(dirPath);
  } catch (e) {
    return;
  }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + "/" + files[i];
      if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath);
      else rmDir(filePath);
    }
};
