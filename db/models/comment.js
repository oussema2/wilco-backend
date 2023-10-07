/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const certificate = require("./certificate");
const pilot = require("./pilot");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: { type: String, required: true },
    pilot_id: { type: mongoose.Types.ObjectId, ref: "Pilot", required: true },
    post_id: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    likes_number: { type: Number, default: 0 },
    dislikes_number: { type: Number, default: 0 },
    likes: [{ type: mongoose.Types.ObjectId, ref: "Pilot", default: [] }],
    dislikes: [{ type: mongoose.Types.ObjectId, ref: "Pilot", default: [] }],
    replies: [
      { type: mongoose.Types.ObjectId, ref: "CommentReply", default: [] },
    ],
    mentioned_pilots: [
      { type: mongoose.Types.ObjectId, ref: "Pilot", default: [] },
    ],
    hashtags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
