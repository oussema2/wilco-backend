/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunitiesSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    pilot_number: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Communities", CommunitiesSchema);
