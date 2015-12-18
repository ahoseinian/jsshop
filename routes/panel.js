'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('panel/index', {
    user: req.user,
    cats: require('../config/cats.json'),
  });
});

module.exports = router;

