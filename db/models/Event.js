const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true },
  event_image: { type: String, required: true },
  going: [{ type: mongoose.Types.ObjectId, ref: "Pilots", default: [] }],
  not_going: [{ type: mongoose.Types.ObjectId, ref: "Pilots", default: [] }],
  maybe: [{ type: mongoose.Types.ObjectId, ref: "Pilots", default: [] }],
  organisator: { type: mongoose.Types.ObjectId, ref: "Pilot", required: true },
});

module.exports = mongoose.model("Event", EventSchema);
