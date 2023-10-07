const multer = require("multer");
const storageFile = require("./fileStorage").fileStorage;
const aircraftpictureStorage = require("./fileStorage").aircraftpictureStorage;

exports.uploadFile = multer({
  storage: storageFile,
});
