const CommunitieRouter = require("express").Router();
const CommunitieController = require("../controllers/CommunitiesController");

CommunitieRouter.route("/addCommunitie").post(
  CommunitieController.addCommunitie
);

module.exports = CommunitieRouter;
