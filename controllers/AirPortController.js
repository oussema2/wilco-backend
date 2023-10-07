const AirPort = require("../db/models/airport");

exports.addAirPort = (req, res) => {
  const reqBody = req.body;
  const airPort = new AirPort(reqBody);
  airPort.save((err, airPort) => {
    if (err) {
      res.send({
        status: 400,
        err: err,
      });
    }

    if (airPort) {
      res.send({
        status: 200,
        airPort: airPort,
      });
    }
  });
};

exports.choosePreferences = (req, res) => {};
