const CommentRouter = require("express").Router();
const CommentController = require("../controllers/commentController");
const JWT = require("../helper/JWT");

CommentRouter.route("/postComment/:postId").post(
  JWT.JWTChecker,
  CommentController.addComment
);

CommentRouter.route("/likeComment/:commentId").get(
  JWT.JWTChecker,
  CommentController.likeComment
);

CommentRouter.route("/unlikeComment/:commentId").get(
  JWT.JWTChecker,
  CommentController.unlikeComment
);

CommentRouter.route("/dislikeComment/:commentId").get(
  JWT.JWTChecker,
  CommentController.dislikeComment
);

CommentRouter.route("/undislikeComment/:commentId").get(
  JWT.JWTChecker,
  CommentController.undislikeComment
);

module.exports = CommentRouter;
