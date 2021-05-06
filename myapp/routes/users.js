var express = require('express');
var router = express.Router();
const auth = require('../app/http/middlewares/auth')

const authController = require('../app/http/controllers/authController')
const postController = require('../app/http/controllers/postController')
const commentController = require('../app/http/controllers/commentController')

/* GET users listing. */
router.get('/', function(req, res, next) {
	//console.log(req);
  res.send('respond with a resource');
});

router.post('/signin',authController().login);
router.post('/signup',authController().Register);
router.post('/logout',auth,authController().logout);

router.post('/post',auth,postController().index);
router.post('/post/create',auth,postController().store);
router.post('/post/edit',auth,postController().edit);
router.post('/post/update',auth,postController().update);
router.post('/post/delete',auth,postController().delete);


router.post('/comment',auth,commentController().index);
router.post('/comment/create',auth,commentController().store);
router.post('/comment/edit',auth,commentController().edit);
router.post('/comment/update',auth,commentController().update);
router.post('/comment/delete',auth,commentController().delete);

module.exports = router;
