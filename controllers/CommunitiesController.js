const Communitie = require("../db/models/communities");

exports.addCommunitie = (req, res) => {
  const communitie = new Communitie(req.body);
  communitie.save((err, comm) => {
    if (err) {
      res.send({
        status: 400,
        err: err,
      });
    }
    if (comm) {
      res.send({
        status: 200,
        message: "ADDED",
        communitie: comm,
      });
    }
  });
};
