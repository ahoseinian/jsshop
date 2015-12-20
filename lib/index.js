var express = require('express');
var router = express.Router();

router.use('/auth', require('./user'));
router.use('/api/products', require('./product'));
router.use('/panel', isLoggedIn, isSeller, require('./panel'));
router.use('/admin', isLoggedIn, isAdmin, require('./admin'));


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    user: req.user,
    cats: require('../config/cats'),
    title: 'Salar'
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

