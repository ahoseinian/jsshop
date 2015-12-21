'use strict';
const router = require('express').Router();
const Category = require('lib/models/category');


router.get('/', function (req, res, next) {
  Category.find().exec(function (err, cats) {
    res.render('panel/index', {
      user: req.user,
      cats: cats,
    });
  });
});

router.use('/products', require('./products'));
module.exports = router;

