/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const pilot = require("./pilot");
const Schema = mongoose.Schema;

const CustomRatingSchema = new Schema(
  {
    name: { type: String, required: true },
    pilot_id: { type: mongoose.Types.ObjectId, ref: "Pilot" },
  },
  { timestamps: true }
);

mongoose.model("CustomRating", CustomRatingSchema);
