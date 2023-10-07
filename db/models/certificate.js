/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CertificateSchema = new Schema(
  {
    name: { type: String, required: true },
    index: { type: Number, default: 0 },
    custom: { type: Boolean, default: "false" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", CertificateSchema);
