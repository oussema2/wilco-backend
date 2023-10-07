/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const pilot = require("./pilot");
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

const PilotReportSchema = new Schema(
  {
    reported_pilot_id: { type: mongoose.Types.ObjectId, ref: "Pilot" },
    reporting_pilot_id: { type: mongoose.Types.ObjectId, ref: "Pilot" },
    reason: { type: String, required: true },
    details: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", PilotReportSchema);
