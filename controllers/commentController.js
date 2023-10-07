const Comment = require("../db/models/comment");
const mongoose = require("mongoose");
const Post = require("../db/models/post");
const CommentReply = require("../db/models/CommentReply");
const hashtagsLogic = require("../helper/handleNewHashtags").hashtagsLogic;
const pushNotification =
  require("../helper/notification_helper").pushNotification;
const pushNotificationForOne =
  require("../helper/notification_helper").pushNotificationForOne;
const pushNotificationForMany =
  require("../helper/notification_helper").pushNotificationForMany;
exports.addComment = async (req, res) => {
  if (!req.pilot) {
    res.status(300).json({
      status: 301,
      message: "Unauthorized",
    });
  }
  const postId = req.params.postId;
  const reqbody = req.body;
  const comment = new Comment(reqbody);

  comment.pilot_id = mongoose.Types.ObjectId(req.pilot._id);
  comment.post_id = mongoose.Types.ObjectId(postId);
  comment.mentioned_pilots =
    reqbody.mentioned_pilots > 0
      ? reqbody.mentioned_pilots.map((el) => mongoose.Types.ObjectId(el))
      : [];
  const hashtagsFromBody = reqbody.text
    .split("\n")
    .join("")
    .split(" ")
    .filter((el) => el[0] === "#");

  comment.hashtags = hashtagsFromBody;
  const responseHashtags = await hashtagsLogic(hashtagsFromBody, res);

  try {
    const resComment = await comment.save();
    if (resComment) {
      const resPostUpdate = await Post.findByIdAndUpdate(postId, {
        $push: { comments: resComment._id },
        $inc: { number_of_comments: 1 },
      });

      if (resPostUpdate) {
        const resPrepare = await pushNotificationForOne(
          {
            title: "Comment",
            text: `${req.pilot.firstName} ${req.pilot.lastName} has post a comment in your post`,
            type: "Comment",
            pilot_id: resPostUpdate.creator_id,
            post_id: resPostUpdate._id,
          },
          {
            title: "Comment",
            body: `${req.pilot.firstName} ${req.pilot.lastName} has post a comment in your post`,
          },
          resPostUpdate.creator_id
        );

        if (reqbody.mentioned_pilots) {
          const notificationMany = await pushNotificationForMany(
            reqbody.mentioned_pilots.map((el) => {
              return {
                title: "Mention",
                text: `${req.pilot.firstName} ${req.pilot.lastName} has mention you in a Comment`,
                type: "Mention",
                post_id: resPostUpdate._id,
                pilot_id: el,
              };
            }),
            {
              title: "Mention",
              body: `${req.pilot.firstName} ${req.pilot.lastName} has mention you in a Comment`,
            },
            reqbody.mentioned_pilots
          );
        }
        console.log(resPrepare);

        if (resPrepare.ok) {
          res.status(200).json({
            post: resPostUpdate,
            hashtags: responseHashtags,
            notification: resPrepare.notification,
            status: 200,
            message: "COMMENT POSTED",
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "ERRORX",
      err: error,
    });
  }
};

exports.likeComment = (req, res) => {
  if (!req.pilot) {
    res.status(300).json({
      status: 301,
      message: "Unauthorized",
    });
  }
  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      $push: { likes: req.pilot._id },
      $inc: { likes_number: 1 },
    },
    async (err, comment) => {
      if (err) {
        res.send({
          status: 400,
          err: err,
        });
      }
      if (comment) {
        const resNotif = await pushNotificationForOne(
          {
            title: "Like",
            text: `${req.pilot.firstName} ${req.pilot.lastName} has Like a comment that you post`,
            type: "Like",
            pilot_id: comment.pilot_id,
            post_id: comment.post_id,
          },
          {
            title: "Like",
            body: `${req.pilot.firstName} ${req.pilot.lastName} has Like a comment that you post`,
          },
          comment.pilot_id
        );
        res.send({
          status: 200,
          message: "LIKED",
        });
      }
    }
  );
};

exports.unlikeComment = (req, res) => {
  console.log("entered");
  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      $pull: { likes: req.pilot._id },
      $inc: { likes_number: -1 },
    },
    (err, comment) => {
      if (err) {
        res.send({
          status: 400,
          err: err,
        });
      }
      if (comment) {
        res.send({
          status: 200,
          message: "UNLIKED",
        });
      }
    }
  );
};

exports.dislikeComment = (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      $push: { dislikes: req.pilot._id },
      $inc: { dislikes_number: 1 },
    },
    async (err, comment) => {
      if (err) {
        res.send({
          status: 400,
          err: err,
        });
      }
      if (comment) {
        const resNotif = await pushNotificationForOne(
          {
            title: "DISLIKE",
            text: `${req.pilot.firstName} ${req.pilot.lastName} has DISLIKE a comment that you post`,
            type: "DISLIKE",
            pilot_id: comment.pilot_id,
            post_id: comment.post_id,
          },
          {
            title: "DISLIKE",
            body: `${req.pilot.firstName} ${req.pilot.lastName} has DISLIKE a comment that you post`,
          },
          comment.pilot_id
        );
        res.send({
          status: 200,
          message: "DISLIKED",
        });
      }
    }
  );
};

exports.undislikeComment = (req, res) => {
  console.log("entered");
  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      $pull: { dislikes: req.pilot._id },
      $inc: { dislikes_number: -1 },
    },
    (err, comment) => {
      if (err) {
        res.send({
          status: 400,
          err: err,
        });
      }
      if (comment) {
        res.send({
          status: 200,
          message: "UNSIDLIKED",
        });
      }
    }
  );
};
