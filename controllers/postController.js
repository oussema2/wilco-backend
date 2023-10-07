const postService = require("../services/postService");
const fs = require("fs");
const path = require("path");
const Post = require("../db/models/post");
const Pilot = require("../db/models/pilot");
const Like = require("../db/models/like");
const _ = require("lodash");
const Hashtag = require("../db/models/hashtag");
const Contribution = require("../db/models/contributions");
const mongoose = require("mongoose");
const hashtagsLogic = require("../helper/handleNewHashtags").hashtagsLogic;
const Comment = require("../db/models/comment");
const Reply = require("../db/models/CommentReply");
const AirCraft = require("../db/models/airCraft");
const Flight = require("../db/models/Flight");
const uploadFile = require("../helper/linode_logic").uploadFile;
const uploadFiles = require("../helper/linode_logic").uploadFiles;
const {
  pushNotificationForMany,
  pushNotificationForOne,
} = require("../helper/notification_helper");
exports.createPost = async (req, res) => {
  const reqBody = req.body;
  console.log(req.files);
  const pilot = req.pilot;
  if (!pilot) {
    res.status(300).json({
      status: 301,
      message: "Unauthorized",
    });
  }
  if (reqBody.from) {
    const date = new Date();
    const flight = Flight({
      from: reqBody.from,
      to: reqBody.to,
      departure_date: req.body.departure_date,
      arrival_date: req.body.arrival_date,
      distance: reqBody.distance,
      airCraft: mongoose.Types.ObjectId(reqBody.airCraft),
      air_port_path: reqBody.air_port_path.map((el) =>
        mongoose.Types.ObjectId(el)
      ),
    });

    try {
      var flightRes = await flight.save();
    } catch (error) {
      res.status(400).json({ err: error, message: "ERROR", status: 400 });
    }
  }

  const post = new Post(reqBody);
  post.mentioned_pilots = reqBody.mentioned_pilots
    ? reqBody.mentioned_pilots.map((el) => mongoose.Types.ObjectId(el))
    : null;
  post.contribution = mongoose.Types.ObjectId(post.contribution);
  post.creator_id = pilot._id;
  post.flight_info = flightRes ? flightRes._id : null;
  try {
    const filesRes = await uploadFiles(req.files);
    console.log("res files :", filesRes);
    if (filesRes) {
      post.post_media = filesRes;
      console.log(post);
      var postRes = await post.save();
      if (postRes) {
        console.log("reached");
        if (reqBody.hashtags) {
          var resHashtags = await hashtagsLogic(reqBody.hashtags);
        }
        if (reqBody.contribution) {
          var contRibutionRes = await Contribution.findByIdAndUpdate(
            reqBody.contribution,
            {
              $inc: { number_of_posts: 1 },
            }
          );
        }

        const pilotUpdated = await Pilot.findByIdAndUpdate(pilot._id, {
          $push: { posts: postRes._id },
        });

        const notificationMany = await pushNotificationForMany(
          reqBody.mentioned_pilots.map((el) => {
            return {
              title: "Mention",
              text: `${req.pilot.firstName} ${req.pilot.lastName} has mention you in a Post`,
              type: "Mention",
              post_id: postRes._id,
              pilot_id: el,
            };
          }),
          {
            title: "Mention",
            body: `${req.pilot.firstName} ${req.pilot.lastName} has mention you in a Post`,
          },
          reqBody.mentioned_pilots
        );

        res.status(200).json({
          message: "POSTED",
          post: postRes,
        });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.likePost = (req, res) => {
  const like = new Like();
  like.pilot_id = req.pilot._id;
  like.post_id = req.params.postId;

  like.save((err, like) => {
    if (err) {
      res.send({
        status: 400,
        err: err,
      });
    }
    if (like) {
      Post.findByIdAndUpdate(
        req.params.postId,
        {
          $inc: { number_of_likes: 1 },
          $push: { Likes: like._id },
        },
        async (err, post) => {
          if (err) {
            res.send({
              status: 400,
              err: err,
            });
          }
          if (post) {
            const notificationMany = await pushNotificationForOne(
              {
                title: "LIKE",
                text: `${req.pilot.firstName} ${req.pilot.lastName} has Liked your  Post`,
                type: "LIKE",
                post_id: post._id,
                pilot_id: post.creator_id,
              },
              {
                title: "LIKE",
                body: `${req.pilot.firstName} ${req.pilot.lastName} has Liked your  Post`,
              },
              post.creator_id
            );
            res.send({
              status: 200,
              like: like,
              post: post,
            });
          }
        }
      );
    }
  });
};

exports.unlikePost = async (req, res) => {
  const redds = await Like.findOneAndDelete({
    pilot_id: req.params.pilotId,
    post_id: req.params.postId,
  });
  Post.findByIdAndUpdate(
    req.params.postId,
    { $pull: { Likes: redds._id }, $inc: { number_of_likes: -1 } },
    (err, ress) => {
      if (err) {
        res.send({
          status: 400,
          err: err,
        });
      }
      if (ress) {
        res.send({
          status: 200,
          like: redds,
          post: ress,
        });
      }
    }
  );
};

exports.getPostsByCommunities = (req, res) => {
  Post.find({ post_Communities: req.params.communitieId }, (err, posts) => {
    if (err) {
      res.send({
        status: 400,
        err: err,
      });
    }
    if (posts) {
      res.send({
        status: 200,
        posts: posts,
      });
    }
  });
};

exports.getPostsByPilotCommunities = (req, res) => {
  Pilot.findById(req.pilot._id, (err, pilotRes) => {
    if (err) {
      res.send({
        message: err,
        status: 400,
      });
    }
    if (pilotRes) {
      Post.find(
        { post_Communities: { $in: pilotRes.communities } },
        (err, posts) => {
          if (err) {
            res.send({
              status: 400,
              err: err,
            });
          }
          if (posts) {
            res.send({
              status: 200,
              posts: posts,
            });
          }
        }
      );
    }
  });
};

exports.searchPost = (req, res) => {
  Post.find(
    {
      $or: [
        { title: { $regex: req.params.pattern, $options: "i" } },
        { text: { $regex: req.params.pattern, $options: "i" } },
        { from: { $regex: req.params.pattern, $options: "i" } },
        { to: { $regex: req.params.pattern, $options: "i" } },
      ],
    },
    (err, posts) => {
      if (err) {
        res.send({ status: 400, message: err });
      }
      if (posts.length > 0) {
        res.send({
          status: 200,
          message: "FETCHED",
          posts: posts,
        });
      } else {
        res.send({
          status: 200,
          message: "NO POST",
        });
      }
    }
  );
};

exports.getPilotsLikedPost = (req, res) => {
  Post.findById(req.params.postId)
    .populate({
      path: "Likes",
      populate: {
        path: "pilot_id",
      },
    })
    .exec((err, resPilots) => {
      if (err) {
        res.send({
          status: 400,
          err: err,
        });
      }
      if (resPilots) {
        res.send({
          status: 200,
          message: "FETCHED",
          resPilots: resPilots.Likes.map((el) => el.pilot_id),
        });
      }
    });
};

exports.deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.postId, (err, response) => {
    if (err) {
      res.send({
        status: 400,
        err: err,
      });
    }
    console.log(req.params.postId);
    if (response) {
      Comment.remove(
        { post_id: { $in: req.params.postId } },
        (err, resComment) => {
          if (err) {
            res.send({
              status: 400,
              err: err,
            });
          }
          if (resComment) {
            res.send({
              status: 200,
              res: "DELETED",
              resCOmment: resComment,
            });
          }
        }
      );
    }
  });
};

exports.updatePost = (req, res) => {
  if (!req.pilot) {
    res.status(301).json({
      message: "Unauthorized",
      status: 301,
    });
  }

  Post.findByIdAndUpdate(
    req.params.postId,
    {
      text: req.body.text,
      title: req.body.title,
      visibility: req.body.visibility,
      mentioned_pilots: req.body.mentioned_pilots
        ? req.body.mentioned_pilots.map((el) => mongoose.Types.ObjectId(el))
        : null,
    },
    async (err, updatedPost) => {
      if (err) {
        res.status(400).json({
          message: "error",
          status: 400,
        });
      }
      if (updatedPost) {
        const resHashtags = await hashtagsLogic(req.body.hashtags);
        res.status(200).json({
          message: "POST UPDATED",
          status: 200,
          post: updatedPost,
        });
      }
    }
  );
};
