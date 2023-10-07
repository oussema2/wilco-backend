const EventRouter = require("express").Router();
const EventController = require("../controllers/EventController");
const JWT = require("../helper/JWT");
const imageUpload = require("../multer/EventMulter/fileUploads").uploadFile;

EventRouter.route("/createEvent").post(
  JWT.JWTChecker,
  imageUpload.single("event_image"),
  EventController.createEvent
);
EventRouter.route("/deleteEvent/:eventId").delete(
  JWT.JWTChecker,
  EventController.deletEvent
);

module.exports = EventRouter;
