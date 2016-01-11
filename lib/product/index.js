var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var sanitizeHtml = require('sanitize-html');


router.get('/search', function (req, res, next) {
  Product
    .find({
      $text: {
        $search: req.query.query
      }
    })
    .exec(function (err, products) {
      if (err) return next(err);

      res.json(products);
    });
});

router.get('/:id/:name?', function (req, res, next) {
  Product
    .findById(req.params.id)
    .populate('_user', 'fullname')
    .populate('_category', 'name')
    .populate('comments._user', 'fullname')
    .exec(function (err, product) {
      if (err) return next(err);

      Product.find({
        _category: product._category
      }).select('_id name price remaining').limit(12).exec(function (err, similars) {
        if (err) return next(err);

        res.json({
          data: product,
          similars: similars
        });
      });

    });
});

router.post('/:id/comments', isLoggedIn, function (req, res, next) {

  Product
    .findById(req.params.id, function (err, doc) {
      if (err) return next(err);
      var cm = doc.comments.create({
        text: sanitizeHtml(req.body.text),
        rate: req.body.rate,
        _user: req.user
      });
      doc.comments.push(cm);

      doc.save(function (err) {
        if (err) return next(err);
        res.json(cm);
      });
    });
});


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.sendStatus(403);
}

