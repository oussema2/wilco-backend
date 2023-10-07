const AirPortRouter = require("express").Router();
const AirPortController = require("../controllers/AirPortController");
AirPortRouter.route("/addAirPort").post(AirPortController.addAirPort);

module.exports = AirPortRouter;
