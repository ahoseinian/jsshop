'use strict';
const router = require('express').Router();
const Purchase = require('lib/models/purchase');

router.get('/', function (req, res, next) {
  Purchase
    .find({})
    .sort('-created_at')
    .populate('products._product', '_id name price')
    .exec(function (err, purchases) {
      if (err) return next(purchases);

      res.json(purchases);
    });
});

router.put('/:id', function (req, res, next) {
  Purchase
    .findOneAndUpdate({
      _id: req.params.id,
    }, {
      $set: req.body
    }, {
      new: true
    }, function (err, purchase) {
      if (err) return next(err);

      res.json(purchase);
    });
});

module.exports = router;

