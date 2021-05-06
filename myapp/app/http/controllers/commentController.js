const Comment = require('../../models/Comment')
function commentController() {
    return {
        index(req, res, next) {
          return Comment.getUsersComment(req, res, next);
        },
      async store(req, res, next) {
        return Comment.createComment(req, res, next);
        },
        edit(req, res,next) {
         return Comment.editComment(req, res, next);
        },
        update(req, res ,next) {
         return Comment.updateComment(req, res, next);
        },
        delete(req, res ,next) {
         return Comment.deleteComment(req, res ,next);
        }
    }
}

module.exports = commentController