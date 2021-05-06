var express = require('express');
var router = express.Router();

const homeController = require('../app/http/controllers/homeController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/all-post',homeController().index);
router.get('/all-post',homeController().index);
router.post('/get-comment',homeController().getCommet);

module.exports = router;
