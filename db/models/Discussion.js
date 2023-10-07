const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema(
  {
    messages: [{ type: mongoose.Types.ObjectId, ref: "Messages", default: [] }],
    participant: [
      { type: mongoose.Types.ObjectId, ref: "Pilot", required: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discussion", DiscussionSchema);
