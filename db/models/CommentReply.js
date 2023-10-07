const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentReplySchema = new Schema(
  {
    text: { type: String, required: true },
    number_of_likes: { type: Number, default: 0 },
    number_of_dislikes: { type: Number, default: 0 },
    pilot: { type: mongoose.Types.ObjectId, ref: "Pilot" },
    comment: { type: mongoose.Types.ObjectId, ref: "Comment" },
    likes: [{ type: mongoose.Types.ObjectId, ref: "Pilot", default: [] }],
    dislikes: [{ type: mongoose.Types.ObjectId, ref: "Pilot", default: [] }],
    mentioned_pilots: [
      { type: mongoose.Types.ObjectId, ref: "Pilot", default: [] },
    ],
    hashtags: [{ type: String }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("CommentReply", CommentReplySchema);
