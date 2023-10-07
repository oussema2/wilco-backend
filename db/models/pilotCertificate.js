/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Pilot = require("./pilot");
const Schema = mongoose.Schema;
const Certificate = require("./certificate");

ObjectId = Schema.ObjectId;

const PilotCertificateSchema = new Schema(
  {
    pilot_id: { type: ObjectId, ref: "Pilot" },
    certificate_id: { type: ObjectId, ref: "Certificate" },
  },
  { timestamps: true }
);

mongoose.model("PilotCertificate", PilotCertificateSchema);
