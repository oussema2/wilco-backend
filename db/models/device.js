/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const pilot = require("./pilot");
const Schema = mongoose.Schema;

const DeviceSchema = new Schema(
  {
    token: { type: String, required: true },
    /* user_id: { type: mongoose.Types.ObjectId, ref: pilot },*/
  },
  { timestamps: true }
);

mongoose.model("Device", DeviceSchema);
