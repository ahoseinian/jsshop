'use strict';
const async = require('async');
const router = require('express').Router();
const Category = require('lib/models/category');
const Product = require('lib/models/product');

router.use('/auth', require('./user'));
router.use('/api/products', require('./product'));
router.use('/panel', isLoggedIn, isSeller, require('./panel'));
router.use('/admin', isLoggedIn, isAdmin, require('./admin'));


/* GET home page. */
router.get('/', function (req, res, next) {
  async.parallel({
    cats: function (cb) {
      Category.find({
        _parent: null
      }).populate({
        path: '_children',
        populate: {
          path: '_children'
        }
      }).exec(cb);
    },
    products: function (cb) {
      Product.find().sort('-created_at').limit(8).populate('_user _cat').exec(cb);
    }
  }, function (err, results) {
    results.user = req.user;
    res.render('index', results);
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

function isSeller(req, res, next) {
  if (req.user.seller) return next();
  res.redirect('/');
}

function isAdmin(req, res, next) {
  if (req.user.admin) return next();
  res.redirect('/');
}

module.exports = router;
