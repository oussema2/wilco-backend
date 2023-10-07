const Event = require("../db/models/Event");
const mongoose = require("mongoose");
const Pilot = require("../db/models/pilot");

exports.createEvent = (req, res) => {
  console.log(res.body);
  const event = new Event(req.body);
  event.organisator = mongoose.Types.ObjectId(req.pilot._id);
  event.save((err, eventRes) => {
    if (err) {
      res.status(400).json({
        err: err,
        message: "failed",
      });
    }
    if (eventRes) {
      Pilot.findByIdAndUpdate(
        req.pilot._id,
        {
          $push: { events: eventRes._id },
        },
        (err, resPilot) => {
          if (err) {
            res.status(400).json({
              err: err,
              message: "failed",
            });
          }
          if (resPilot) {
            res.status(200).json({
              err: err,
              message: "OK",
              event: eventRes,
            });
          }
        }
      );
    }
  });
};

exports.deletEvent = (req, res) => {
  Event.findByIdAndDelete(req.params.eventId, (err, resDelete) => {
    if (err) {
      res.status(400).json({
        err: err,
        message: "failed",
      });
    }
    if (resDelete) {
      Pilot.findByIdAndUpdate(
        req.pilot._id,
        {
          $pull: { events: req.params.eventId },
        },
        (err, resPilot) => {
          if (err) {
            res.status(400).json({
              err: err,
              message: "failed",
            });
          }
          if (resPilot) {
            res.status(200).json({
              message: "DELETED",
              res: resPilot,
            });
          }
        }
      );
    }
  });
};
