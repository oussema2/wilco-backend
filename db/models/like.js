/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema(
  {
    pilot_id: { type: mongoose.Types.ObjectId, ref: "Pilot" },
    post_id: { type: mongoose.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Like", LikeSchema);
