/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pilot = require("./pilot");

const BlockedPilotSchema = new Schema(
  {
    blocked_pilot_id: { type: mongoose.Types.ObjectId, ref: "Pilot" },
  },
  { timestamps: true }
);

mongoose.model("BlockedPilot", BlockedPilotSchema);
