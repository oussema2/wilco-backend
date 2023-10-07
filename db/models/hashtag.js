/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

const HastagSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    post_number: { number: Number, default: 0 },
  },
  { timestamps: true },
  { _id: this.name }
);

module.exports = mongoose.model("Hashtag", HastagSchema);
