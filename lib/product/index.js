var express = require('express');
var router = express.Router();
var Product = require('lib/models/product');

router.get('/:name', function (req, res, next) {
  Product
    .findOne({
      name: req.params.name
    })
    .populate('_user', 'fullname')
    .populate('_category', 'name')
    .populate('comments._user', 'fullname')
    .exec(function (err, product) {
      if (err) return next(err);

      Product.find({
        _category: product._category
      }).limit(12).exec(function (err, similars) {
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
      if (err) next(err);
      var cm = doc.comments.create({
        text: req.body.text,
        rate: req.body.rate,
        _user: req.user
      });
      doc.comments.push(cm);

      doc.save(function (err, saved) {
        if (err) next(err);
        res.json(cm);
      })
    })
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.sendStatus(403);
}

