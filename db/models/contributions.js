const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContributionSchema = new Schema({
  name: { type: String, required: true, unique: true },
  number_of_posts: { type: Number, default: 0 },
});

module.exports = mongoose.model("Contribution", ContributionSchema);
