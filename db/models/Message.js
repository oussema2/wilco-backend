const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchemaa = new Schema(
  {
    sender: { type: mongoose.Types.ObjectId, ref: "Pilot" },
    message: { type: String, required: false },
    pictures: [{ type: String, required: false }],
    discussion: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchemaa);
