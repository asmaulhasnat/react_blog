const Post = require('../../models/Post')
function postController() {
    return {
        index(req, res, next) {
          return Post.getUsersPost(req, res, next);
        },
      async store(req, res, next) {
        return Post.createPost(req, res, next);
        },
        edit(req, res,next) {
         return Post.editPost(req, res, next);
        },
        update(req, res ,next) {
         return Post.updatePost(req, res, next);
        },
        delete(req, res ,next) {
         return Post.deletePost(req, res ,next);
        }
    }
}

module.exports = postController