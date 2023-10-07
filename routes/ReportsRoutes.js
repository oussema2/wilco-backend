const ReportRouter = require("express").Router();
const ReportController = require("../controllers/ReportsController");
const JWT = require("../helper/JWT");

ReportRouter.route("/reportPilot/:reporting_pilot_id/:reported_pilot_id").post(
  JWT.JWTChecker,
  ReportController.reportPilot
);

module.exports = ReportRouter;
