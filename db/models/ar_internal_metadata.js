/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArInternalDataSchema = new Schema(
  {
    value: { type: String, default: "" },
  },
  { timestamps: true }
);

mongoose.model("ArInternalData", ArInternalDataSchema);
