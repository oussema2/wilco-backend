const Contribution = require("../db/models/contributions");

exports.addContribution = (req, res) => {
  const contribution = new Contribution(req.body);
  contribution.save((err, cont) => {
    if (err) {
      res.send({
        status: 400,
        message: err,
      });
    }
    if (cont) {
      res.send({
        message: "ADDED",
        status: 200,
        contribution: cont,
      });
    }
  });
};
