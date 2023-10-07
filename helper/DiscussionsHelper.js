const Discussion = require("../db/models/Discussion");
const Message = require("../db/models/Message");
const mongoose = require("mongoose");
exports.sendMessage = async (data, cb) => {
  const messageObj = new Message();
  messageObj.sender = mongoose.Types.ObjectId(data.from);
  messageObj.pictures = [];
  messageObj.discussion = mongoose.Types.ObjectId(data._id);
  messageObj.message = data.message;
  const messageResponse = await messageObj.save();
  if (messageResponse._id) {
    const discussionResponse = await Discussion.findByIdAndUpdate(data._id, {
      $push: { messages: messageResponse._id },
    });
    if (discussionResponse._id) {
      return {
        status: 200,
        message: "OK",
        message: messageResponse,
      };
    } else {
      return {
        status: 400,
        message: "FAILED",
      };
    }
  }
};

exports.startDiscussion = async (data) => {
  const discussion = new Discussion();
  discussion.participant = [
    mongoose.Types.ObjectId(data.from),
    mongoose.Types.ObjectId(data.to),
  ];
  const response = await discussion.save();
  if (response._id) {
    data["_id"] = response._id;
    return this.sendMessage(data);
  }
};
