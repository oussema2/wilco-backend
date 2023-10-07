/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const PilotSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    roles: [{ type: String, ref: "Role", default: [] }],
    banner: { type: String, required: false, default: "" },
    home_airport: {
      type: mongoose.Types.ObjectId,
      ref: "Airport",
    },
    air_craft: [{ type: String, default: [] }],
    primary_aircraft: { type: String },
    communities: [
      { type: mongoose.Types.ObjectId, ref: "Communities", default: [] },
    ],
    certificates: [{ type: String, default: [] }],
    rating_endorsements: [{ type: String, default: [] }],
    total_hours: { type: String, default: 0 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    profile_picture_link: { type: String, required: true },
    profile_picture_key: { type: String, required: true },
    blocked_pilots: [{ type: mongoose.Types.ObjectId, ref: "BlockedPilot" }],
    friends: [{ type: mongoose.Types.ObjectId, ref: "Pilot", default: [] }],
    otherAirPorts: [
      { type: mongoose.Types.ObjectId, ref: "AirPort", default: [] },
    ],
    post_likes: [{ type: mongoose.Types.ObjectId, ref: "Like", default: [] }],
    comment_likes: [
      { type: mongoose.Types.ObjectId, ref: "Like", default: [] },
    ],
    reply_likes: [{ type: mongoose.Types.ObjectId, ref: "Like", default: [] }],
    comment_disLikes: [
      { type: mongoose.Types.ObjectId, ref: "Like", default: [] },
    ],
    reply_disLikes: [
      { type: mongoose.Types.ObjectId, ref: "Like", default: [] },
    ],
    events: [{ type: mongoose.Types.ObjectId, ref: "Event", default: [] }],
    reset_password_code: { type: String, default: "" },
    account_status: { type: String, default: "AVAILABLE" },
    recieving_invitations: [
      { type: mongoose.Types.ObjectId, ref: "Pilot", default: [] },
    ],
    firends: [{ type: mongoose.Types.ObjectId, ref: "Pilot", default: [] }],
    blockList: [{ type: mongoose.Types.ObjectId, ref: "Pilot", default: [] }],
    online: { type: Boolean, default: false },
    device_token: { type: String, required: true },
  },
  { timestamps: true }
);

PilotSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("Pilot", PilotSchema);
