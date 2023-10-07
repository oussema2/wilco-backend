const ReplyRouter = require("express").Router();
const ReplyController = require("../controllers/ReplyController");
const JWT = require("../helper/JWT");

ReplyRouter.route("/replyComment/:commentId/").post(
  JWT.JWTChecker,
  ReplyController.replyComment
);
ReplyRouter.route("/deleteReply/:replyId").delete(ReplyController.deleteReply);

ReplyRouter.route("/likeReply/:replyId").get(
  JWT.JWTChecker,
  ReplyController.likeReply
);

ReplyRouter.route("/unlikeReply/:replyId").get(
  JWT.JWTChecker,
  ReplyController.unlikeReply
);

ReplyRouter.route("/dislikeReply/:replyId").get(
  JWT.JWTChecker,
  ReplyController.dislikeReply
);

ReplyRouter.route("/undislikeReply/:replyId").get(
  JWT.JWTChecker,
  ReplyController.undislikeReply
);

module.exports = ReplyRouter;
