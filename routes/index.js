var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/api/products', require('./products'));
router.use('/panel', isLoggedIn, require('./panel'));


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {user: req.user, title: 'Salar'});
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = router;
