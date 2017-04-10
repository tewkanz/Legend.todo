var express = require('express');
var router = express.Router();
var viewTest = require('../views/viewTest/viewTest');
var writeTest = require('../views/writeTest/writeTest.js');
var testServiceHandler = require("../views/writeTest/testServiceHandler");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/viewTest', function (req, res, next) {
  viewTest.render(req, res, next);
})
router.get('/writeTest', function (req, res, next) {
  res.render('writeTest', writeTest.getData());
});

module.exports = router;
