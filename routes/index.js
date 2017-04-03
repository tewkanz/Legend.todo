var express = require('express');
var router = express.Router();
var viewTest= require('../views/viewTest/viewTest');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/viewTest', function(req, res, next){
  viewTest.render(req,res,next);
})

module.exports = router;
