const AirCraftRouter = require("express").Router();
const AirCraftController = require("../controllers/airCraftController");
const { JWTChecker } = require("../helper/JWT");
const aircraftPictureUpload =
  require("../multer/AirCraftMulter/fileUploads").aircraftPictureUpload;

AirCraftRouter.route("/addAirCraft").post(
  JWTChecker,
  aircraftPictureUpload.single("aicraft_picture"),
  AirCraftController.addAirCraft
);

module.exports = AirCraftRouter;
