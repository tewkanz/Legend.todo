var express = require('express');
var router = express.Router();
var testServiceHandler = require("../views/writeTest/testServiceHandler");

router.post('/writeTest', function (req, res, next) {
  testServiceHandler.testWrite(req, res, next);
})

module.exports = router;