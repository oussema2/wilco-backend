const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  from: { type: String, requied: true },
  to: { type: String, required: true },
  departure_date: { type: Date, required: true },
  arrival_date: { type: Date, required: true },
  //   max_speed: { type: Number, required: true },
  //   max_altitude: { type: Number, required: true },
  distance: { type: Number, required: true },
  airCraft: {
    type: mongoose.Types.ObjectId,
    ref: "AirCraft",
    required: false,
  },
  air_port_path: [{ type: mongoose.Types.ObjectId, ref: "Airport" }],
});

module.exports = mongoose.model("Flight", FlightSchema);
