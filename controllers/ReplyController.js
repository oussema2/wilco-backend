const Comment = require("../db/models/comment");
const mongoose = require("mongoose");
const CommentReply = require("../db/models/CommentReply");
const hashtagsLogic = require("../helper/handleNewHashtags").hashtagsLogic;
const {
  pushNotificationForMany,
  pushNotificationForOne,
} = require("../helper/notification_helper");
exports.replyComment = async (req, res) => {
  const commentId = req.params.commentId;
  const commentReply = new CommentReply(req.body);
  const hashtagsFromBody = req.body.text
    .split("\n")
    .join("")
    .split(" ")
    .filter((el) => el[0] === "#");
  commentReply.pilot = mongoose.Types.ObjectId(req.pilot._id);
  commentReply.hashtags = hashtagsFromBody;
  commentReply.comment = mongoose.Types.ObjectId(commentId);
  try {
    var commenRply = await commentReply.save();
    if (commenRply) {
      const commentRes = await Comment.findByIdAndUpdate(commentId, {
        $push: { replies: commenRply._id },
      });
      if (commentRes) {
        console.log(commentRes);
        const notificationMany = await pushNotificationForOne(
          {
            title: "COMMENT",
            text: `${req.pilot.firstName} ${req.pilot.lastName} has Replied to your Comment`,
            type: "COMMENT",
            post_id: commentRes.post_id,
            pilot_id: commentRes.pilot_id,
          },
          {
            title: "COMMENT",
            body: `${req.pilot.firstName} ${req.pilot.lastName} has Replied to your Comment`,
          },
          commentRes.pilot_id
        );

        res.send({
          status: 200,
          reply: commenRply,
          message: "ok",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      err: error,
      message: "ERROR",
      status: 400,
    });
  }
};

exports.deleteReply = (req, res) => {
  CommentReply.findByIdAndDelete(req.params.replyId, (err, reply) => {
    if (err) {
      res.send({
        status: 400,
        message: err,
      });
    }
    if (reply) {
      Comment.findByIdAndUpdate(
        reply.comment,
        { $pull: { replies: reply._id } },
        (err, commentRes) => {
          if (err) {
            res.send({
              status: 400,
              err: err,
            });
          }
          if (commentRes) {
            res.send({
              status: 200,
              reply: reply,
              message: "DELETED",
            });
          }
        }
      );
    }
  });
};

exports.likeReply = async (req, res) => {
  try {
    const reply = await CommentReply.findByIdAndUpdate(req.params.replyId, {
      $push: { likes: req.pilot._id },
      $inc: { likes_number: 1 },
    });
    if (reply) {
      const comment = await Comment.findOne({ _id: reply.comment });
      if (comment) {
        console.log(comment);
        const notificationMany = await pushNotificationForOne(
          {
            title: "LIKE",
            text: `${req.pilot.firstName} ${req.pilot.lastName} has Liked your Reply`,
            type: "LIKE",
            post_id: comment.post_id,
            pilot_id: reply.pilot,
          },
          {
            title: "LIKE",
            body: `${req.pilot.firstName} ${req.pilot.lastName} has Liked your Reply`,
          },
          reply.pilot
        );
      }
    }
    res.send({
      status: 200,
      message: "LIKED",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      err: error,
      message: "ERROR",
      status: 400,
    });
  }
};

exports.unlikeReply = (req, res) => {
  console.log("entered");
  CommentReply.findByIdAndUpdate(
    req.params.replyId,
    {
      $pull: { likes: req.pilot._id },
      $inc: { likes_number: -1 },
    },
    (err, reply) => {
      if (err) {
        res.send({
          status: 400,
          err: err,
        });
      }
      if (reply) {
        res.send({
          status: 200,
          message: "UNLIKED",
        });
      }
    }
  );
};

exports.dislikeReply = async (req, res) => {
  try {
    console.log(req.pilot._id);
    const reply = await CommentReply.findByIdAndUpdate(req.params.replyId, {
      $push: { dislikes: req.pilot._id },
      $inc: { dislikes_number: 1 },
    });
    if (reply) {
      console.log(reply);
      const comment = await Comment.findOne({ _id: reply.comment });
      if (comment) {
        console.log(comment);
        const notificationMany = await pushNotificationForOne(
          {
            title: "DISLIKE",
            text: `${req.pilot.firstName} ${req.pilot.lastName} has DisLiked your Reply`,
            type: "DISLIKE",
            post_id: comment.post_id,
            pilot_id: reply.pilot,
          },
          {
            title: "DISLIKE",
            body: `${req.pilot.firstName} ${req.pilot.lastName} has Disliked your Reply`,
          },
          reply.pilot
        );
      }
    }

    res.send({
      status: 200,
      message: "DISLIKED",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      err: error,
      message: "ERROR",
      status: 400,
    });
  }
};

exports.undislikeReply = (req, res) => {
  console.log("entered");
  CommentReply.findByIdAndUpdate(
    req.params.replyId,
    {
      $pull: { dislikes: req.pilot._id },
      $inc: { dislikes_number: -1 },
    },
    (err, reply) => {
      if (err) {
        res.send({
          status: 400,
          err: err,
        });
      }
      if (reply) {
        res.send({
          status: 200,
          message: "UNSIDLIKED",
        });
      }
    }
  );
};
