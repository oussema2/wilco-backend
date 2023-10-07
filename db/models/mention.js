/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const pilot = require("./pilot");
const Schema = mongoose.Schema;
const Post = require("./post");
const LikeSchema = new Schema(
  {
    pilot_id: { type: mongoose.Types.ObjectId, ref: "Pilot" },
    post_id: { type: mongoose.Types.ObjectId, ref: "Post" },
    mentioned_pilot_id: { type: mongoose.Types.ObjectId, ref: "Pilot" },
  },
  { timestamps: true }
);

mongoose.model("Like", LikeSchema);
