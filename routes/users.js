var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find(function(err, users){
		if(err){next(err)};
		res.json(users);
	})
});

router.post('/', function(req, res, next) {
  var user = new User(req.body);

  user.save(function(err, user){
    if(err){ return next(err); }
    res.json(user);
  });
});

router.delete('/:id', function(req, res, next){
	User.remove({_id: req.params.id },function(err, removed){
		if(err){ next(err); }
		res.json(removed);
	})
});

router.put('/:id', function(req, res, next) {
  User.update({_id: req.params.id}, req.body, function(err, user){
    if(err){ return next(err); }
    res.json(user);
  });
});

module.exports = router;
