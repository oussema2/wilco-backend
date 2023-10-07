/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const pilot = require("./pilot");
const rating = require("./rating");
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

const PilotRatingSchema = new Schema(
  {
    pilot_id: { type: mongoose.Types.ObjectId, ref: "Pilot" },
    rating_id: { type: mongoose.Types.ObjectId, ref: "Rating" },
  },
  { timestamps: true }
);

mongoose.model("PilotRating", PilotRatingSchema);
