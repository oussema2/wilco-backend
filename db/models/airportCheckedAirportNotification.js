/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Airport = require("./airport");

const AirportCheckedAirportNotificationSchema = new Schema(
  {
    airport_id: {
      type: mongoose.Types.ObjectId,
      ref: "Airport",
      required: true,
    },
    checked: { type: Boolean, default: "" },
  },
  { timestamps: true }
);

mongoose.model(
  "AirportCheckedAirportNotification",
  AirportCheckedAirportNotificationSchema
);
