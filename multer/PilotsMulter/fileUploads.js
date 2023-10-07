const multer = require("multer");
const storageFile = require("./fileStorage").fileStorage;
const updateProfilePic = require("./fileStorage").updateProfilePic;
exports.uploadFile = multer({
  storage: storageFile,
});

exports.updateProfilePic = multer({
  storage: updateProfilePic,
});
