const Post = require('../../models/Post')
const Comment = require('../../models/Comment')
function postController() {
    return {
        index(req, res, next) {
          return Post.getPost(req, res, next);
        },
        getCommet(req, res, next) {
          return Comment.getComment(req, res, next);
        }
    }
}

module.exports = postController