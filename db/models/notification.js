/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, required: true },
    seen: { type: Boolean, default: false },
    pilot_id: { type: mongoose.Types.ObjectId, ref: "Pilot" },
    post_id: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
