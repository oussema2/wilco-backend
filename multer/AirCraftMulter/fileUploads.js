const multer = require("multer");
const aircraftpictureStorage = require("./fileStorage").aircraftpictureStorage;

exports.aircraftPictureUpload = multer({
  storage: aircraftpictureStorage,
});
