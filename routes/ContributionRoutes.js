const ContributionRouter = require("express").Router();
const ContributionController = require("../controllers/ContributionController");
const JWT = require("../helper/JWT");

ContributionRouter.route("/addContribution").post(
  JWT.JWTChecker,
  ContributionController.addContribution
);

module.exports = ContributionRouter;
