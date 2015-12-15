'use strict';
var express = require('express');
var router = express.Router();
var passport = require('../config/passport');

router.post('/login', passport.authenticate('local', { 
	successRedirect: '/',
	failureRedirect: '/#failure',
}));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/#/auth/signup?error=true', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


module.exports = router;