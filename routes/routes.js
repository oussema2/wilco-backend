const express = require("express");
const router = express.Router();

const pilot = require("../controllers/pilotController");

const airCraft = require("../controllers/airCraftController");

const post = require("../controllers/postController");

/**
 * Pilot's Routes
 */

router.post("/pilots", function (req, res, next) {
  pilot.create(req, res, next);
});

router.get("/pilots/:id", function (req, res, next) {
  pilot.get(req, res, next);
});

router.get("/pilots", function (req, res, next) {
  pilot.getAll(req, res, next);
});

// router.patch('/pilots/:id', function(req, res, next) {
//     pilot.edit(req,res,next);
// });

router.delete("/pilots/:id", function (req, res, next) {
  pilot.deleteData(req, res, next);
});

/**
 * AirCraft Routes
 */
router.post("/pilots/me/aircrafts", function (req, res, next) {
  airCraft.create(req, res, next);
});

router.delete("/aircrafts/:id", function (req, res, next) {
  pilot.deleteData(req, res, next);
});

/**
 * Post's Routes
 */
router.post("/posts", function (req, res, next) {
  post.create(req, res, next);
});

router.get("/posts", function (req, res, next) {
  post.getAll(req, res, next);
});

router.get("/posts/:id", function (req, res, next) {
  post.get(req, res, next);
});

router.delete("/posts/:id", function (req, res, next) {
  post.deleteData(req, res, next);
});

router.post("/posts/:post_id/like", function (req, res, next) {
  post.like(req, res, next);
});

router.post("/posts/:post_id/unlike", function (req, res, next) {
  post.unLike(req, res, next);
});

router.post("/pilot/:pilot_id/posts", function (req, res, next) {
  post.getPostsByPilot(req, res, next);
});

/**
 * Post comment's Routes
 */

router.post("/posts/:post_id/comments", function (req, res, next) {
  post.like(req, res, next);
});

router.get("/posts/:post_id/comments", function (req, res, next) {
  post.unLike(req, res, next);
});

router.post("/comments/:id", function (req, res, next) {
  post.like(req, res, next);
});

module.exports = router;
