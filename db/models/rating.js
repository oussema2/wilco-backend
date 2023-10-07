const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  name: { type: String, required: true },
  costum: { type: Boolean, required: true },
});

module.exports = mongoose.model("Rating", RatingSchema);
