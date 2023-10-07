/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationTypeSchema = new Schema({
  type: { type: String, required: true },
});

module.exports = mongoose.model("NotificationType", NotificationTypeSchema);
