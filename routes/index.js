var express = require('express');
var router = express.Router();

router.use( '/auth', require('./auth') );
router.use( '/api/users', isLoggedIn, require('./users') );
router.use( '/api/customers', isLoggedIn, require('./customers') );
router.use( '/api/products', isLoggedIn, require('./products') );
router.use( '/api/models', isLoggedIn, require('./models') );
router.use( '/api/purchases', isLoggedIn, require('./purchases') );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user, title: 'Salar'});
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = router;
