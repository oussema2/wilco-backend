/*!
 * Module dependencies
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

const RoleSchema = new Schema(
  {
    name: { type: String },
    custom: { type: Boolean },
  },
  { timestamps: true }
);

mongoose.model("Role", RoleSchema);
