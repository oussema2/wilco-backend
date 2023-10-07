/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const AirportSchema = require("./airport");
const pilot = require("./pilot");
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

const PilotAirportSchema = new Schema(
  {
    pilot_id: { type: mongoose.Types.ObjectId, ref: "Pilot" },
    airport_id: { type: mongoose.Types.ObjectId, ref: "Airport" },
    home_airport: { type: Boolean, default: false },
  },
  { timestamps: true }
);

mongoose.model("PilotAirport", PilotAirportSchema);
