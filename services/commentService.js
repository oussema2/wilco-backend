const Comment = require('../db/models/comment');

async function create(commentData) {
 const comment = new Comment(commentData);
 comment.save();
}

async function get(commentId) {
    return  await Post.find({ _id: commentId });
}


async function deleteData(commentId) {
    comment.deleteOne({_id: commentId});
}

module.exports = {
    create,
    get,
    deleteData,
}