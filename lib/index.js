'use strict';
var async = require('async');
var router = require('express').Router();
var Category = require('./models/category');
var Product = require('./models/product');

router.use('/auth', require('./auth'));
router.use('/api/products', require('./product'));
router.use('/api/categories', require('./categories'));
router.use('/api/purchases', isLoggedIn, require('./purchase'));
router.use('/panel', isLoggedIn, isSeller, require('./panel'));
router.use('/admin', isLoggedIn, isAdmin, require('./admin'));
router.get('/sitemap.xml', require('./sitemap'));

/* GET home page. */
router.get('/', HomeController);

// catch 404 and forward to error handler
router.use(HomeController);

module.exports = router;

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

function HomeController(req, res, next) {
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
      Product.find({
        deleted: false,
        remaining: {
          $gt: 0
        }
      }).select('_id name price remaining').sort('-created_at').limit(12).exec(cb);
    }
  }, function (err, results) {
    if (err) return next(err);
    results.user = req.user;
    results.cities = require('../config/cities.json');
    res.render('index', results);
  });
}

