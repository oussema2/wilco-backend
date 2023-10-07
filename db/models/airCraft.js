/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * AirCraft schema
 */

const AirCraftSchema = new Schema({
  make_and_model: { type: String, required: true },
  removed: { type: Boolean, default: false, required: true },
  aicraft_picture: { type: String, required: true },
  tail_number: { type: String, required: true },
});

module.exports = mongoose.model("AirCraft", AirCraftSchema);
