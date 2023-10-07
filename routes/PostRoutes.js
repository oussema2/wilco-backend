const PostRouter = require("express").Router();
const PostController = require("../controllers/postController");
const imageUpload = require("../multer/PostsMulter/fileUploads").uploadFile;

const JWT = require("../helper/JWT");
PostRouter.route("/createPost").post(
  JWT.JWTChecker,
  imageUpload.array("post_media", 9999),
  PostController.createPost
);

PostRouter.route("/likePost/:postId").get(
  JWT.JWTChecker,
  PostController.likePost
);

PostRouter.route("/unlikePost/:postId/:pilotId").get(
  JWT.JWTChecker,
  PostController.unlikePost
);

PostRouter.route("/getPostsByCommunities/:communitieId").get(
  JWT.JWTChecker,
  PostController.getPostsByCommunities
);

PostRouter.route("/getPostsByPilotCommunities").get(
  JWT.JWTChecker,
  PostController.getPostsByPilotCommunities
);

PostRouter.route("/searchPost/:pattern").get(PostController.searchPost);

PostRouter.route("/getPilotsLikedPost/:postId").get(
  PostController.getPilotsLikedPost
);

PostRouter.route("/updatePost/:postId").put(
  JWT.JWTChecker,
  PostController.updatePost
);

PostRouter.route("/deletePost/:postId").delete(PostController.deletePost);

module.exports = PostRouter;
