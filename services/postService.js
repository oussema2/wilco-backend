const Post = require('../db/models/post');
const Like = require('../db/models/like');
const Comment = require('../db/models/comment');
async function create(postData) {
    const post = new Pilot(postData);
    await post.save();
}

async function get(postId) {
    return  await Post.findOne({ _id: postId });
}

async function getAll() {
    return  await Post.find({});
}

async function getPostsByPilot(postId) {
    return  await Post.find({post_id: postId});
}

async function deleteData(postId) {
    return await Post.deleteOne({_id: postId});
}

async function likeUnlike(postId, pilot_id, isLike) {
    let post = await Post.findOne({ _id: postId });
    let likeData = {
        post_id: postId,
        pilot_id: pilotId
    }

    if(isLike) {
        post.number_of_likes = post.number_of_likes + 1;
        await Like.save(likeData);
    } else {
        post.number_of_likes = post.number_of_likes - 1;
        await Like.deleteOne(likeData); 
    }

    await post.save();
    return 
}

module.exports = {
    create,
    get,
    getAll,
    deleteData,
    likeUnlike,
    getPostsByPilot
}