/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Pilot = require("../models/pilot");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    text: { type: String, required: true },
    number_of_likes: { type: Number, default: 0 },
    number_of_comments: { type: Number, default: 0 },
    title: { type: String, required: true },
    visibility: { type: String, required: true },
    post_media: [{ type: String, default: [] }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment", default: [] }],
    Likes: [{ type: mongoose.Types.ObjectId, ref: "Like", default: [] }],
    flight_info: { type: mongoose.Types.ObjectId, ref: "Flight" },
    mentioned_pilots: [
      { type: mongoose.Types.ObjectId, ref: "Pilot", default: [] },
    ],

    post_Communities: [
      { type: mongoose.Types.ObjectId, ref: "Communities", default: [] },
    ],
    contribution: {
      type: mongoose.Types.ObjectId,
      ref: "Contribution",
    },
    post_type: { type: String, required: true },
    creator_id: { type: mongoose.Types.ObjectId, ref: "Pilot", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
