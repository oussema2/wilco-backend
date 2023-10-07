const Report = require("../db/models/pilotReport");
const Pilot = require("../db/models/pilot");
const mongoose = require("mongoose");
exports.reportPilot = (req, res) => {
  const report = new Report(req.body);
  report.reported_pilot_id = mongoose.Types.ObjectId(
    req.params.reported_pilot_id
  );
  report.reporting_pilot_id = mongoose.Types.ObjectId(
    req.params.reporting_pilot_id
  );
  report.save((err, reportRes) => {
    if (err) {
      res.send({
        message: err,
        status: 400,
      });
    }
    if (reportRes) {
      Pilot.findByIdAndUpdate(
        req.params.reported_pilot_id,
        {
          $push: { reports: reportRes._id },
        },
        (err, postUpdated) => {
          if (postUpdated) {
            res.send({
              message: err,
              status: 200,
              post: postUpdated,
            });
          }
          if (err) {
            res.send({
              message: err,
              status: 400,
            });
          }
        }
      );
    }
  });
};
