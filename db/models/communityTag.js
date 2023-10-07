/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const communities = require("./communities");
const Schema = mongoose.Schema;

const CommunityTag = new Schema({
  taggable_type: { type: String, required: true },
  community_id: { type: mongoose.Types.ObjectId, ref: "Communities" },
  taggable_id: { type: mongoose.Types.ObjectId, ref: "Communities" },
});

mongoose.model("CommunityTag", CommunityTag);
